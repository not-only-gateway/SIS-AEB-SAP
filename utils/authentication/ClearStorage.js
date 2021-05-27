import Cookies from 'universal-cookie/lib'

const cookies = new Cookies()

export default async function ClearStorage() {
    cookies.remove('theme', {path: '/'})
    cookies.remove('jwt', {path: '/'})
    cookies.remove('jwt', {path: '/en'})
    cookies.remove('lang', {path: '/'})
    cookies.remove('exp', {path: '/'})
    cookies.remove('exp', {path: '/en'})
    cookies.remove('authorization_token', {path: '/en'})
    cookies.remove('authorization_token', {path: '/'})

    sessionStorage.removeItem('profile')
    sessionStorage.removeItem('accessProfile')
    sessionStorage.removeItem('collaboration')
}