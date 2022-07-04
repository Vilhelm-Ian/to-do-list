import {useState, useEffect} from "react"

export default function ToDo(props: any) {
  const [editing, setEditing] = useState(false)
  const [toDo, setToDo] = useState(props.value)

  useEffect(()=>{
  setToDo(props.value)
  },[props.value])

  function remove() {
    props.remove();
    console.log("hello");
  }

  function edit() {
  setEditing(true)
  }

  function update(e) {
  setToDo(e.target.value)
  }

  function done() {
    props.setToDos((oldToDos: string[])=>{
    oldToDos[props.index] = toDo
    return [...oldToDos]
  })
  setEditing(false)
  }


  if(!editing){
  return (
    <div className="todo">
      <span><span onClick={remove}>🗑️</span> {props.value}</span>
      <button onClick={edit}>Edit</button>
    </div>
  );
  }
  else {
    return (
    <div className="todo">
    <input onChange={update} value={toDo}></input>
    <button onClick={done}>Done</button>
    </div>
    )
  }
}
