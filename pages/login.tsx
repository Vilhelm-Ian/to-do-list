import {useState} from "react"
import styles from '../styles/Login.module.css'
import {useEffect} from "react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

   
  function update_input(text: string,callback:Function) {
  if(text.length>30) return
  callback(text)
  }

  async function register(e: any) {
  e.preventDefault()
  try{
    let res = await fetch("http://localhost:3000/api/register",{
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {
        'Content-Type': "application/json",
      },
    })
  }
  catch(err) {
    console.log(err)
  }
}
   
async function login(e: any) {
  e.preventDefault()
  try{
  let res = await fetch("http://localhost:3000/api/login",{
  method: "POST",
  body: JSON.stringify({username, password}),
  headers: {
    'Content-Type': "application/json",
  },
  })
  if(res.status === 200) {
    let token = await res.json()
    document.cookie = `token=${token.name}`
  }
  if(res.status === 401) alert("invalid login")
  }
  catch(err) {
    console.log(err)
  }
}
	return (
		<div className="container">
      <div className="content">
        <form className={styles.form} method="post">
          <label>username</label>
          <input onChange={(e)=>update_input(e.target.value,setUsername)}  value={username} name="username" placeholder="Enter username" type="text"/>
          <label  placeholder="Enter password">password</label>
          <input onChange={(e)=>update_input(e.target.value,setPassword)}  value={password} name="password" type="password"/>  
          <button type="submit" onClick={login}>Login</button>
          <button type="submit" onClick={register}>Register</button>
      </form>
      </div>
    </div>
	)
	 
}

//export async function getServerSideProps(context){
//  let cookie = context.req.headers.cookie
//  if(cookie.split("=").length !== 0){
//    let token = cookie.split("=")[1]
//    let res = await fetch("http://localhost:3000/api/validate_token",{
//      method: "POST",
//      body: token,
//    }) 
//  }
//  return {
//    props: {}
//  }
//}
