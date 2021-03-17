import Cookies from "universal-cookie/lib";

const cookies = new Cookies()
export default function setCookiesLanguage(lang) {
    cookies.remove('lang', {path: '/'})
    cookies.set('lang', lang, {path: '/'})
}