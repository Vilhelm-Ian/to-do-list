// @ts-nocheck
import type { NextPage } from "next";
import { useState, useEffect, useMemo } from "react";
import ToDo from "../components/ToDo";
import { getCookie } from "cookies-next";
import { format_date, format_time } from "../utils/format_date";

const Home: NextPage = ({ setUsername }) => {
  let today = new Date().toLocaleDateString();
  let [to_dos, setToDos] = useState([]);
  let [to_do, setToDo] = useState("");
  let [date, setDate] = useState(format_date(today));
  let [time, setTime] = useState(format_time(new Date()));
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [isFirstRender, setIsFirstRender] = useState(true);

  let token = getCookie("token");

  useEffect(() => {
    async function authenticate() {
      try {
        let res = await fetch(`${process.env.URL}/api/validate_token`, {
          method: "POST",
        }).catch((err) => console.log(err));
        let data = await res.json();
        console.log(data);
        data = JSON.parse(data.name);
        setIsLoggedIn(true);
        setUsername(data.username);
        setToDos(data.to_dos);
      } catch (err) {
        console.log(`${err} authenticating`);
      }
    }
    if (token !== undefined) authenticate();
    else {
      let to_dos_from_local_storage = localStorage.getItem("to_dos");
      setToDos(JSON.parse(to_dos_from_local_storage) || []);
    }
  }, []);

  useEffect(() => {
    if (token === undefined) {
      setIsLoggedIn(false);
      let to_dos_from_local_storage = localStorage.getItem("to_dos");
      if (to_dos_from_local_storage)
        setToDos(JSON.parse(to_dos_from_local_storage));
      else setToDos([]);
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${process.env.URL}/api/update`, {
        method: "POST",
        body: JSON.stringify({ to_dos }),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => console.log(`error updating: ${err}`));
    } else {
      if (!isFirstRender)
        localStorage.setItem("to_dos", JSON.stringify(to_dos));
      update_to_dos_if_local();
    }
    setIsFirstRender(false);
  }, [to_dos, isLoggedIn]);

  useEffect(() => sort_to_dos(), [to_dos.length]);

  function update_to_dos_if_local() {
    let to_dos_from_local_storage = localStorage.getItem("to_dos");
    let newToDos = JSON.parse(to_dos_from_local_storage);
    setToDos((oldToDos) => {
      if (oldToDos.toString() !== newToDos.toString()) return newToDos;
      else return oldToDos;
    });
  }

  function addElement(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setToDos((oldToDos) => {
      let new_to_dos = [...oldToDos, { to_do, date, time }];
      if (!isLoggedIn)
        localStorage.setItem("to_dos", JSON.stringify(new_to_dos));
      return new_to_dos;
    });
    sort_to_dos();
    setToDo("");
  }

  function addTodo(e) {
    setToDo(e.target.value);
  }

  function sort_to_dos() {
    setToDos((oldToDos) =>
      oldToDos.sort((a, b) => {
        let first = Number("".concat(...a.date.split("-")));
        let second = Number("".concat(...b.date.split("-")));
        return first - second;
      })
    );
  }

  let to_do_jsx = useMemo(() => generate_to_do_jsx(), [to_dos]);

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
