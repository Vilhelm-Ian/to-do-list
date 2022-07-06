// @ts-nocheck
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import ToDo from "../components/ToDo";
import { getCookie } from "cookies-next";
import { format_date, format_time } from "../utils/format_date";
import {element} from "../models/userModel"

const Home: NextPage = ({ recived_todos,  setUsername, username }) => {
  let today = new Date().toLocaleDateString();
  let [to_dos, setToDos] = useState([]);
  let [to_do, setToDo] = useState("");
  let [date, setDate] = useState(format_date(today));
  let [time, setTime] = useState(format_time(new Date()));

  let token = getCookie("token") 

  useEffect(() => {
    if (getCookie("token") === undefined) {
      if (localStorage.getItem("to_dos"))
        setToDos(JSON.parse(localStorage.getItem("to_dos")));
      else setToDos([]);
    }
  }, [token]);

  useEffect(() => {
    if (getCookie("token") !== undefined) {
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
        .then((data) => {
          setUsername(username);
        })
        .catch((err) => console.log(err));
    } else {
      localStorage.setItem("to_dos", JSON.stringify(to_dos));
      update_to_dos_if_local();
    }
  }, [to_dos, token, recived_todos, setUsername, username]);

   
  useEffect(()=>sort_to_dos(),[to_dos.length])

  function update_to_dos_if_local() {
    let to_dos_from_local_storage = localStorage.getItem("to_dos");
    setToDos((oldToDos) => {
      let newToDos = JSON.parse(to_dos_from_local_storage);
      if (oldToDos.toString() !== newToDos.toString()) return oldToDos;
      else return oldToDos;
    });
  }

  function addElement(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setToDos((oldToDos) => {
      let new_to_dos = [...oldToDos, { to_do, date, time }];
      if (getCookie("token") === undefined)
        localStorage.setItem("to_dos", JSON.stringify(new_to_dos));
      return new_to_dos;
    });
    sort_to_dos()
    setToDo("");
  }

  function addTodo(e) {
    setToDo(e.target.value);
  }

  function sort_to_dos() {
  setToDos(oldToDos=>oldToDos.sort((a,b)=> {
    let first = Number("".concat(...a.date.split("-")))
    let second = Number("".concat(...b.date.split("-")))
    return first-second
  }))
  }

  let to_do_jsx = generate_to_do_jsx();

  function generate_to_do_jsx() {
    return to_dos.map((element: object, key: number) => (
      <ToDo
        key={key}
        setToDos={setToDos}
        index={key}
        value={element.to_do}
        date={element.date}
        time={element.time}
      />
    ));
  }

  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="content--title">TODO LIST</div>
          <div className="content--elements">
            <form className="form" onSubmit={addElement}>
              <span className="form--inputs">
              <input
                minLength="1"
                maxLength="20"
                type="text"
                name="todo"
                placeholder="📝todo"
                onChange={addTodo}
                value={to_do}
                className="form--element form--input"
                min="1"
                max="30"
              />
              <input
                min={format_date(today)}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form--element form--date form--input"
                type="date"
              />
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="form--element form--date form--input"
                type="time"
              />
              </span>
              <button
                type="submit"
                name="submit"
                className="form--element form--submit"
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
      data = JSON.parse(data.name)
      let obj: {
        recived_todos: element[];
        username: string;
      } = { recived_todos: data.to_dos,  username: data.username };
      return { props: obj };
    }
  } catch (err) {
    console.log(err);
  }
  return {
    props: {},
  };
}
