import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from "react"
import ToDo from "../components/ToDo.js"

const Home: NextPage = () => {
  let [to_dos, setToDos] = useState<JSX.Element[]>([])
  let [to_do, setToDo] = useState(""
                                 )
  function addElement(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    setToDos(oldToDos=>[
    ...oldToDos,
    <ToDo key={oldToDos.length}  remove={()=>removeTodo(to_do)} value={to_do} />
    ])
  }

  function removeTodo(value: string) {
    setToDos(todos=>todos.filter(todo=>todo.props.value!==value))
  }

  function addTodo(e) {
    setToDo(e.target.value)
  }

  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="content--title">
            TODO LIST
          </div>
          <div className="content--elements">
            <form className="form">
              <input  type="text" name="todo" onChange={addTodo} value={to_do} className="form--element form--input"/>
              <button type="submit" name="submit" className="form--element form--submit" onClick={addElement}>SUBMIT</button>
            </form>
              {to_dos}
          </div>
        </div>
      </div>
    </div>  
  )
}

export default Home
