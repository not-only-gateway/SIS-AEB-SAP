import Cookies from 'universal-cookie/lib'


export default async function ClearStorage(){
    const cookies = new Cookies()
    cookies.remove('theme')
    cookies.remove('jwt')
    cookies.remove('person_id')
    cookies.remove('lang')
    localStorage.removeItem('profile')
}