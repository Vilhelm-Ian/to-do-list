import { useState, useEffect } from "react";

export default function ToDo(props: any) {
  const [editing, setEditing] = useState(false);
  const [toDo, setToDo] = useState(props.value);
  const [index, setIndex] = useState(props.index);
  const [date, setDate] = useState(props.date);
  const [time, setTime] = useState(props.time);

  useEffect(() => {
    setToDo(props.value);
  }, [props.value]);

  useEffect(() => {
    setIndex(props.index);
  }, [props.index]);

  function remove() {
    props.setToDos((oldTodos) =>
      oldTodos.filter(
        (_, position_in_array: number) => index !== position_in_array
      )
    );
  }

  function handle_input(value, callback) {
    callback(value);
  }

  function edit() {
    setEditing(true);
  }

  function done() {
    props.setToDos((oldToDos: []) => {
      oldToDos[props.index].to_do = toDo;
      return [...oldToDos];
    });
    props.setToDos((oldTodo) => {
      oldTodo[index].to_do = toDo;
      oldTodo[index].date = date;
      oldTodo[index].time = time;
      console.log(oldTodo[index]);
      return [...oldTodo];
    });
    setEditing(false);
  }

  if (!editing) {
    return (
      <div className="todo">
        <span className="todo--right--half">
          <span onClick={remove}>🗑️</span>
          <span className="todo--task">{props.value}</span>
        </span>
        <div className="todo--left--half">
          <span className="todo--time">
            {props.date} {props.time}
          </span>
          <button className="todo--button" onClick={edit}>
            EDIT
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="todo">
        <div className="todo--editing">
          <input className="todo--edit" onChange={(e)=> handle_input(e.target.value, setToDo)} value={toDo}></input>
          <input
            value={date}
            className="todo--edit"
            onChange={(e) => handle_input(e.target.value, setDate)}
            type="date"
          />
          <input
            className="todo--edit"
            value={time}
            onChange={(e) => handle_input(e.target.value, setTime)}
            type="time"
          />
        </div>
        <div>
          <button onClick={done} className="todo--button todo--edit--button">
            DONE
          </button>
        </div>
      </div>
    );
  }
}
