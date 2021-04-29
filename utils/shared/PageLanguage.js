import Cookies from "universal-cookie/lib";
import SignInEN from '../../pages/locales/signin/SignInEN'
import SignInES from '../../pages/locales/signin/SignInES'
import SignInPT from '../../pages/locales/signin/SignInPT'

import SettingsEN from '../../pages/locales/settings/SettingsEN'
import SettingsES from '../../pages/locales/settings/SettingsES'
import SettingsPT from '../../pages/locales/settings/SettingsPT'

import IndexEN from "../../pages/locales/index/IndexEN";
import IndexES from "../../pages/locales/index/IndexES";
import IndexPT from "../../pages/locales/index/IndexPT";

import PersonEN from '../../pages/locales/person/PersonEN'
import PersonES from '../../pages/locales/person/PersonES'
import PersonPT from '../../pages/locales/person/PersonPT'

import ActivityEN from "../../pages/locales/activity/ActivityEN";
import ActivityES from "../../pages/locales/activity/ActivityES";
import ActivityPT from "../../pages/locales/activity/ActivityPT";


import StructureEN from "../../pages/locales/structure/StructureEN";
import StructureES from "../../pages/locales/structure/StructureES";
import StructurePT from "../../pages/locales/structure/StructurePT";

import CreateEN from "../../pages/locales/create/CreateEN";
import CreateES from "../../pages/locales/create/CreateES";
import CreatePT from "../../pages/locales/create/CreatePT";
import ManagementEN from "../../pages/locales/management/ManagementEN";
import ManagementES from "../../pages/locales/management/ManagementES";
import ManagementPT from "../../pages/locales/management/ManagementPT";

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

                case '/structure': {
                    response = StructureEN
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

                case '/structure': {
                    response = StructureES
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
                case '/structure': {
                    response = StructurePT
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