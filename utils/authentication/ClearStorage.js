import Cookies from 'universal-cookie/lib'
import Dexie from "dexie";

const cookies = new Cookies()

export default async function ClearStorage() {
    await Dexie.delete('user')
    cookies.remove('theme', {path: '/'})
    cookies.remove('jwt', {path: '/'})
    cookies.remove('jwt', {path: '/en'})
    cookies.remove('lang', {path: '/'})
    cookies.remove('exp', {path: '/'})
    cookies.remove('exp', {path: '/en'})
    cookies.remove('authorization_token', {path: '/en'})
    cookies.remove('authorization_token', {path: '/'})
}