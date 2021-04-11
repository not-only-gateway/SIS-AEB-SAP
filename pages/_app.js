import '../styles/globals.css'
import Cookies from "universal-cookie/lib";
import shared from '../styles/shared/Shared.module.css'

const cookies = new Cookies()

export default function TogetherApp({ Component, pageProps}){
    return (
        <Component {...pageProps}/>
    )
}