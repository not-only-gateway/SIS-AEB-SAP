import Cookies from "universal-cookie/lib";
import SignInEN from '../locales/signin/SignInEN'
import SignInES from '../locales/signin/SignInES'
import SignInPT from '../locales/signin/SignInPT'

import SettingsEN from '../locales/settings/SettingsEN'
import SettingsES from '../locales/settings/SettingsES'
import SettingsPT from '../locales/settings/SettingsPT'

// import SettingsEN from '../locales/settings/SettingsEN'
// import SettingsES from '../locales/settings/SettingsES'
// import SettingsPT from '../locales/settings/SettingsPT'

const cookies = new Cookies()

export function setCookiesLanguage(lang) {
    cookies.remove('lang', {path: '/'})
    cookies.set('lang', lang, {path: '/'})
}

export function getLanguage (locale, page){
    let response = null
    switch (true) {
        case locale === 'en' && page === '/signin': {
            response = SignInEN
            break
        }
        case locale ===  'es' && page === '/signin': {
            response = SignInES
            break
        }
        case locale ===  'pt' && page === '/signin': {
            response = SignInPT
            break
        }
        case locale ===  'en' && page === '/settings': {
            response = SettingsEN
            break
        }
        case locale ===  'es' && page === '/settings': {
            response = SettingsES
            break
        }
        case locale ===  'pt' && page === '/settings': {
            response = SettingsPT
            break
        }
        default: {
            break
        }
    }
    return response
}