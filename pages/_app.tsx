import "../styles/globals.css";
import type { AppProps } from "next/app";
import {useState} from "react"
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState("")
  return (
    <div>
      <NavBar setUsername={setUsername} username={username}/>
      <Component setUsername={setUsername} {...pageProps} />
    </div>
  );
}

export default MyApp;
