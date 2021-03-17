import Cookies from 'universal-cookie/lib'

const cookies = new Cookies()
export default async function ClearStorage(){
    cookies.remove('theme')
    cookies.remove('jwt')
    cookies.remove('lang')
}