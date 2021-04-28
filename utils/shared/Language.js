import Cookies from "universal-cookie/lib";
import SignInEN from '../../locales/signin/SignInEN'
import SignInES from '../../locales/signin/SignInES'
import SignInPT from '../../locales/signin/SignInPT'

import SettingsEN from '../../locales/settings/SettingsEN'
import SettingsES from '../../locales/settings/SettingsES'
import SettingsPT from '../../locales/settings/SettingsPT'

import IndexEN from "../../locales/index/IndexEN";
import IndexES from "../../locales/index/IndexES";
import IndexPT from "../../locales/index/IndexPT";

import PersonEN from '../../locales/person/PersonEN'
import PersonES from '../../locales/person/PersonES'
import PersonPT from '../../locales/person/PersonPT'

import ActivityEN from "../../locales/activity/ActivityEN";
import ActivityES from "../../locales/activity/ActivityES";
import ActivityPT from "../../locales/activity/ActivityPT";

import MenuEN from "../../locales/menu/MenuEN";
import MenuPT from "../../locales/menu/MenuPT";
import MenuES from "../../locales/menu/MenuES";

import StructureEN from "../../locales/structure/StructureEN";
import StructureES from "../../locales/structure/StructureES";
import StructurePT from "../../locales/structure/StructurePT";

import CreateEN from "../../locales/create/CreateEN";
import CreateES from "../../locales/create/CreateES";
import CreatePT from "../../locales/create/CreatePT";

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
                case '/menu': {
                    response = MenuEN
                    break
                }
                case '/structure': {
                    response = StructureEN
                    break
                }
                case '/create' : {
                    response = CreateEN
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
                case '/menu': {
                    response = MenuES
                    break
                }
                case '/structure': {
                    response = StructureES
                    break
                }
                case '/create' : {
                    response = CreateES
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
                case '/menu': {
                    response = MenuPT
                    break
                }
                case '/structure': {
                    response = StructurePT
                    break
                }
                case '/create' : {
                    response = CreatePT
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