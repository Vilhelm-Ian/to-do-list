import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from "../components/NavBar.js"

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <div>
    <NavBar/>
    <Component {...pageProps} />
  </div>)
}

export default MyApp
