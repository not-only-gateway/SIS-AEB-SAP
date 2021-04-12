import '../styles/globals.css'
import Cookies from "universal-cookie/lib";
import {useRouter} from "next/router";

const cookies = new Cookies()

export default function SisAeb({ Component, pageProps}){
    return (
        <Component {...pageProps}/>
    )
}