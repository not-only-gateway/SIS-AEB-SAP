import Cookies from "universal-cookie/lib";

const cookies = new Cookies()


export function setThemeCookie() {
    const currentExpiration = cookies.get('exp')

    switch (cookies.get('theme')) {
        case '0': {
            cookies.remove('theme')
            cookies.set('theme', 1, {
                path: '/',
                expires: currentExpiration !== undefined ? new Date(parseInt(currentExpiration)) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            })
            break
        }
        case '1': {
            cookies.remove('theme')
            cookies.set('theme', 0, {
                path: '/',
                expires: currentExpiration !== undefined ? new Date(parseInt(currentExpiration)) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            })
            break
        }
        default: {
            cookies.set('theme', 0, {
                path: '/',
                expires: currentExpiration !== undefined ? new Date(parseInt(currentExpiration)) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            })
            break
        }
    }
}
