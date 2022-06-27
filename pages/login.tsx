import {useState} from "react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
   
  async function register(e) {
  e.preventDefault()
  try{
    let res = await fetch("http://localhost:3000/api/register",{
  method: "POST",
  body: JSON.stringify({username, password}),
  headers: {
    'Content-Type': "application/json",
  },
  })
  console.log(res,"hi")
  }
  catch(err) {
    console.log(err)
  }
}
   
  async function login(e) {
  e.preventDefault()
  try{
    let res = await fetch("http://localhost:3000/api/login",{
  method: "POST",
  body: JSON.stringify({username, password}),
  headers: {
    'Content-Type': "application/json",
  },
  })
  console.log(res,"hi")
  }
  catch(err) {
    console.log(err)
  }
}
	return (
		<div>
      <form  method="post">
      <label>username</label>
        <input onChange={(e)=>setUsername(e.target.value)}  value={username} name="username" placeholder="Enter username" type="text"/>
      <label  placeholder="Enter password">password</label>
      <input onChange={(e)=>setPassword(e.target.value)}  value={password} name="password" type="password"/>  
      <button type="submit" onClick={login}>Click Me</button>
      </form>
      <p>register</p>
       <form  method="post">
         <label>username</label>
         <input onChange={(e)=>setUsername(e.target.value)}  value={username} name="username" placeholder="Enter username" type="text"/>
         <label  placeholder="Enter password">password</label>
         <input onChange={(e)=>setPassword(e.target.value)}  value={password} name="password" type="password"/>
         <button type="submit" onClick={register}>Click Me</button>
 </form>
    </div>
	)
	 
}
