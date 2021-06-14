import Cookies from "universal-cookie/lib";


import SettingsEN from '../../packages/page locales/settings/SettingsEN'
import SettingsPT from '../../packages/page locales/settings/SettingsPT'

import IndexEN from "../../packages/page locales/index/IndexEN";
import IndexPT from "../../packages/page locales/index/IndexPT";

import UnitsEN from "../../packages/page locales/units/UnitsEN";
import UnitsPT from "../../packages/page locales/units/UnitsPT";

const cookies = new Cookies()

export function setCookiesLanguage(lang) {
    cookies.remove('lang', {path: '/'})
    const currentExpiration = cookies.get('exp')
    cookies.set('lang', lang, {
        path: '/',
        expires: currentExpiration !== undefined ? new Date(parseInt(currentExpiration)) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    })
}

export function getLanguage(locale, page) {
    let response = null
    switch (locale) {
        case 'en': {
            switch (page) {

                case '/' : {
                    response = IndexEN
                    break
                }

                case '/settings': {
                    response = SettingsEN
                    break
                }


                case '/units': {
                    response = UnitsEN
                    break
                }

                default:
                    break
            }
            break
        }

        case 'pt': {
            switch (page) {

                case '/' : {
                    response = IndexPT
                    break
                }

                case '/settings': {
                    response = SettingsPT
                    break
                }

                case '/units': {
                    response = UnitsPT
                    break
                }
                default:
                    break
            }
            break
        }
        default: {
            break
        }
    }
    return response
}