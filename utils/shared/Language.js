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

import * as PersonEN from '../../locales/person/PersonEN'
import * as PersonES from '../../locales/person/PersonES'
import * as PersonPT from '../../locales/person/PersonPT'

import ActivityEN from "../../locales/activity/ActivityEN";
import ActivityES from "../../locales/activity/ActivityES";
import ActivityPT from "../../locales/activity/ActivityPT";

import ManagementEN from "../../locales/management/ManagementEN";
import ManagementPT from "../../locales/management/ManagementPT";

const cookies = new Cookies()

export function setCookiesLanguage(lang) {
    cookies.remove('lang', {path: '/'})
    cookies.set('lang', lang, {path: '/'})
}

export function getLanguage (locale, page){
    let response = null
    switch (locale) {
        case 'en': {
            switch(page){
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
                case '/management': {
                    response = ManagementEN
                    break
                }
                default:
                    break
            }
            break
        }
        case 'es': {
            switch(page){
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
                case '/management': {
                    response = ManagementEs
                    break
                }
                default:
                    break
            }

            break
        }
        case 'pt': {
            switch(page){
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
                case '/management': {
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