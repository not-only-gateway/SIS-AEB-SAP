import '../styles/globals.css'
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default function SISAEB({ Component, pageProps}){
    return (
        <Component {...pageProps}/>
    )
}