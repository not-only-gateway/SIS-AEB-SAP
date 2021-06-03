import Cookies from "universal-cookie/lib";
import AuthenticateEN from '../../packages/page locales/authenticate/AuthenticateEN'
import AuthenticatePT from '../../packages/page locales/authenticate/AuthenticatePT'

import SettingsEN from '../../packages/page locales/settings/SettingsEN'
import SettingsPT from '../../packages/page locales/settings/SettingsPT'

import ActivityEN from "../../packages/page locales/activity/ActivityEN";
import ActivityPT from "../../packages/page locales/activity/ActivityPT";

import CreateEN from "../../packages/page locales/create/CreateEN";
import CreatePT from "../../packages/page locales/create/CreatePT";

import ManagementEN from "../../packages/page locales/management/ManagementEN";
import ManagementPT from "../../packages/page locales/management/ManagementPT";

import UnitPT from "../../packages/page locales/unit/UnitPT";
import UnitEN from "../../packages/page locales/unit/UnitEN";

const cookies = new Cookies()

export function setCookiesLanguage(lang) {
    cookies.remove('lang', {path: '/'})
    cookies.set('lang', lang, {
        path: '/'
    })
}

export function getLanguage(locale, page) {
    let response = null
    switch (locale) {
        case 'en': {
            switch (page) {
                case '/authenticate': {
                    response = AuthenticateEN
                    break

                }
                case '/settings': {
                    response = SettingsEN
                    break
                }
                case '/activity': {
                    response = ActivityEN
                    break
                }

                case '/create' : {
                    response = CreateEN
                    break
                }
                case '/' : {
                    response = ManagementEN
                    break
                }
                case '/unit' : {
                    response = UnitEN
                    break
                }
                default:
                    break
            }
            break
        }

        case 'pt': {
            switch (page) {
                case '/authenticate': {
                    response = AuthenticatePT
                    break
                }

                case '/settings': {
                    response = SettingsPT
                    break
                }
                case '/activity': {
                    response = ActivityPT
                    break
                }
                case '/create' : {
                    response = CreatePT
                    break
                }
                case '/' : {
                    response = ManagementPT
                    break
                }
                case '/unit' : {
                    response = UnitPT
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