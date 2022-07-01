import Link from "next/link";

interface props_interface {
  username: string,
  setUsername(arg:string): void,
  setLoggedin(arg:boolean|undefined): void 
}

export default function NavBar(props:props_interface) {
  function logout() {
  document.cookie = "token = ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
  props.setUsername("")
  }

  return (
    <nav>
      <h1>ToDo</h1>
      <Link href="/">
        <p>Home</p>
      </Link>
      {
      props.username !== "" ?
        <div>
          <p>logged in as {props.username}</p>
          <p onClick={logout}>logout</p>
        </div>
      : <Link href="/login">
        <p>Login</p>
      </Link>
      }
    </nav>
  );
}
