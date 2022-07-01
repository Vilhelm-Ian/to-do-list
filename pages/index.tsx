// @ts-nocheck
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import ToDo from "../components/ToDo";



const Home: NextPage = ({ recived_todos, token, setUsername, username }) => {
  let [to_dos, setToDos] = useState([]);
  let [to_do, setToDo] = useState("");

  useEffect(() => {
    if (token !== undefined) {
      if (to_dos.length === 0) setToDos(recived_todos);
      let response = JSON.stringify({ token, to_dos });
      fetch(`${process.env.URL}/api/update`, {
        method: "POST",
        body: response,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(data=>{
          console.log(data)
          setUsername(username)
        })
        .catch((err) => console.log(err));
    }
  }, [to_dos, token, recived_todos]);


  function addElement(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setToDos((oldToDos) => [...oldToDos, to_do]);
  }

  function removeTodo(value: string) {
    setToDos((todos) => todos.filter((todo) => todo !== value));
  }

  function addTodo(e) {
    if (e.target?.value.length > 30) return;
    setToDo(e.target.value);
  }
  let to_do_jsx = to_dos.map((value: string, key: number) => (
    <ToDo key={key} remove={() => removeTodo(value)} value={value} />
  ));

  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="content--title">TODO LIST</div>
          <div className="content--elements">
            <form className="form">
              <input
                type="text"
                name="todo"
                placeholder="📝todo"
                onChange={addTodo}
                value={to_do}
                className="form--element form--input"
              />
              <button
                type="submit"
                name="submit"
                className="form--element form--submit"
                onClick={addElement}
              >
                SUBMIT
              </button>
            </form>
            {to_do_jsx}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  try {
    let cookie: string = context.req.headers.cookie;
    if (cookie !== undefined) {
      let token = cookie.split("=")[1];
      let res = await fetch(`${process.env.URL}/api/validate_token`, {
        method: "POST",
        body: token,
      }).catch((err) => console.log(err));
      let data = await res.json();
      data = JSON.parse(data.name);
      console.log(data,"hi")
      let obj: {
        recived_todos: string[];
        token: string;
        username: string
      } = { recived_todos: data.to_dos, token, username: data.username};
      return { props: obj };
    }
  } catch (err) {
    console.log(err);
  }
  return {
    props: {},
  };
}
