import {useState, useEffect} from "react"

export default function ToDo(props: any) {
  const [editing, setEditing] = useState(false)
  const [toDo, setToDo] = useState(props.value) 
  const [index, setIndex] = useState(props.index)

  useEffect(()=>{
  setToDo(props.value)
  },[props.value])

   
  useEffect(()=>{
  setIndex(props.index)
  },[props.index])
   
  function remove() {
    props.setToDos(oldTodos=>oldTodos.filter((_, position_in_array: number)=> index!==position_in_array))
  }

  function edit() {
  setEditing(true)
  }

  function update(e) {
    props.setToDos(oldTodo=>{
    oldTodo[index].to_do =  e.target.value
    return [...oldTodo]
    })
  }

  function done() {
    props.setToDos((oldToDos: [])=>{
    oldToDos[props.index].to_do = toDo
    return [...oldToDos]
  })
  setEditing(false)
  }


  if(!editing){
  return (
    <div className="todo">
      <span><span onClick={remove}>🗑️</span><span className="todo--task">{props.value}</span></span>
      <div className="todo--left--half">
      <span className="todo--time">{props.date} {props.time}</span>
      <button className="todo--edit" onClick={edit}>EDIT</button>
      </div>
    </div>
  );
  }
  else {
    return (
    <div className="todo">
    <input className="todo--edit" onChange={update} value={toDo}></input>
    <button onClick={done}>Done</button>
    </div>
    )
  }
}
