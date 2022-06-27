import Link from 'next/link'

export default function NavBar(){

return (
<nav>
  <h1>ToDo</h1>
  <Link href="/">
  <p>Home</p>
  </Link>
  <Link href="/login">
  <p>Login</p>
  </Link>
</nav>
)
}

