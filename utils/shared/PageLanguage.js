import Cookies from "universal-cookie/lib";
import SignInEN from '../../packages/page locales/signin/SignInEN'
import SignInES from '../../packages/page locales/signin/SignInES'
import SignInPT from '../../packages/page locales/signin/SignInPT'

import SettingsEN from '../../packages/page locales/settings/SettingsEN'
import SettingsES from '../../packages/page locales/settings/SettingsES'
import SettingsPT from '../../packages/page locales/settings/SettingsPT'

import IndexEN from "../../packages/page locales/index/IndexEN";
import IndexES from "../../packages/page locales/index/IndexES";
import IndexPT from "../../packages/page locales/index/IndexPT";

import PersonEN from '../../packages/page locales/person/PersonEN'
import PersonES from '../../packages/page locales/person/PersonES'
import PersonPT from '../../packages/page locales/person/PersonPT'

import ActivityEN from "../../packages/page locales/activity/ActivityEN";
import ActivityES from "../../packages/page locales/activity/ActivityES";
import ActivityPT from "../../packages/page locales/activity/ActivityPT";

import CreateEN from "../../packages/page locales/create/CreateEN";
import CreateES from "../../packages/page locales/create/CreateES";
import CreatePT from "../../packages/page locales/create/CreatePT";

import ManagementEN from "../../packages/page locales/management/ManagementEN";
import ManagementES from "../../packages/page locales/management/ManagementES";
import ManagementPT from "../../packages/page locales/management/ManagementPT";

import UnitsEN from "../../packages/page locales/units/UnitsEN";
import UnitsES from "../../packages/page locales/units/UnitsES";
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
                case '/signin': {
                    response = SignInEN
                    break
                }
                case '/' : {
                    response = IndexEN
                    break
                }
                case '/person': {
                    response = PersonEN
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

                case '/units': {
                    response = UnitsEN
                    break
                }
                case '/create' : {
                    response = CreateEN
                    break
                }
                case '/management' : {
                    response = ManagementEN
                    break
                }
                default:
                    break
            }
            break
        }
        case 'es': {
            switch (page) {
                case '/signin': {
                    response = SignInES
                    break
                }
                case '/' : {
                    response = IndexES
                    break
                }
                case '/person': {
                    response = PersonES
                    break
                }
                case '/settings': {
                    response = SettingsES
                    break
                }
                case '/activity': {
                    response = ActivityES
                    break
                }

                case '/units': {
                    response = UnitsES
                    break
                }
                case '/create' : {
                    response = CreateES
                    break
                }
                case '/management' : {
                    response = ManagementES
                    break
                }
                default:
                    break
            }

            break
        }
        case 'pt': {
            switch (page) {
                case '/signin': {
                    response = SignInPT
                    break
                }
                case '/' : {
                    response = IndexPT
                    break
                }
                case '/person': {
                    response = PersonPT
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
                case '/units': {
                    response = UnitsPT
                    break
                }
                case '/create' : {
                    response = CreatePT
                    break
                }
                case '/management' : {
                    response = ManagementPT
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