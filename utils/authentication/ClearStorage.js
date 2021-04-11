import Cookies from 'universal-cookie/lib'
import Dexie from "dexie";

const cookies = new Cookies()

export default async function ClearStorage() {
    await Dexie.delete('user')
    cookies.remove('theme')
    cookies.remove('jwt')
    cookies.remove('lang')

}