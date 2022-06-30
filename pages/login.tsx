import { useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  function update_input(text: string, callback: Function) {
    if (text.length > 30) return;
    callback(text);
  }

  async function register(e: any) {
    e.preventDefault();
    try {
        await fetch(`${process.env.URL}/api/register`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function login(e: any) {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.URL}/api/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        let token = await res.json();
        document.cookie = `token=${token.name}`;
        router.push("/");
      }
      if (res.status === 401) {
        let error = await res.json();
        console.log(error);
        alert("invalid login");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="container">
      <div className="content">
        <div className="content--title">WELCOME</div>
        <form className={styles.form} method="post">
          <input
            onChange={(e) => update_input(e.target.value, setUsername)}
            className={styles.form_element}
            value={username}
            name="username"
            placeholder="🧍username"
            type="text"
          />
          <input
            placeholder="🔒password"
            onChange={(e) => update_input(e.target.value, setPassword)}
            className={styles.form_element}
            value={password}
            name="password"
            type="password"
          />
          <button
            className={`${styles.form_element} ${styles.login}`}
            type="submit"
            onClick={login}
          >
            Login
          </button>
          <button
            type="submit"
            className={`${styles.form_element} ${styles.register}`}
            onClick={register}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
