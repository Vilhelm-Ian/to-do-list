// @ts-nocheck
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from "react"
import ToDo from "../components/ToDo"

const Home: NextPage = ({data, cookie}) => {
  let [to_dos, setToDos] = useState([])
  let [to_do, setToDo] = useState("")
  
  useEffect(()=>{
  if(cookie!==undefined) {
    if(to_dos.length===0)setToDos(data.to_dos)
    let token = cookie.split("=")[1]
    let response = JSON.stringify({token: token, to_dos: to_dos})
     
    fetch("http://localhost:3000/api/update",{
      method: "POST",
      body: response,
      headers: {
        'Content-Type': "application/json",
      },

    }).then(res=>res.json())
  }
  },[to_dos,cookie,data.to_dos])

  function addElement(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    setToDos(oldToDos=>[
    ...oldToDos,
    to_do,
    ])
  }

  function removeTodo(value: string) {
    setToDos(todos=>todos.filter(todo=>todo!==value))
  }

  function addTodo(e) {
    if(e.target?.value.length>30) return
    setToDo(e.target.value)
  }
  let to_do_jsx = to_dos.map((value: string, key: number)=> <ToDo key={key}  remove={()=>removeTodo(value)} value={value} />)
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
              {to_do_jsx}
          </div>
        </div>
      </div>
    </div>  
  )
}

export default Home

export async function getServerSideProps(context: any){
  let cookie: string = context.req.headers.cookie
  if(cookie.split("=").length !== 0){
    let token = cookie.split("=")[1]
    let res = await fetch("http://localhost:3000/api/validate_token",{
      method: "POST",
      body: token,
    })
    let data = await res.json()
    data = JSON.parse(data.name)
    let obj: {
      data: any,
      cookie: string
    } = {data, token} 
    return { props: obj}
  }
  return {
    props: {}
  }
}

