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
    props.setToDos(oldTodos=>oldTodos.filter((_, position_in_array)=> index!==position_in_array))
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
      <span><span onClick={remove}>🗑️</span>{props.value}</span>
      <span><span>{props.date} {props.time} </span><button onClick={edit}>Edit</button></span>
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
