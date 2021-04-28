import PropTypes from 'prop-types'
import ContactFormEN from '../../components/locales/contact/ContactFormEN'
import ContactFormES from '../../components/locales/contact/ContactFormES'
import ContactFormPT from '../../components/locales/contact/ContactFormPT'

import DocumentsFormEN from '../../components/locales/documents/DocumentsFormEN'
import DocumentsFormES from '../../components/locales/documents/DocumentsFormES'
import DocumentsFormPT from '../../components/locales/documents/DocumentsFormPT'

import CollaborationsFormEN from '../../components/locales/collaborations/CollaborationsFormEN'
import CollaborationsFormES from '../../components/locales/collaborations/CollaborationsFormES'
import CollaborationsFormPT from '../../components/locales/collaborations/CollaborationsFormPT'

import BaseFormEN from '../../components/locales/base/BaseFormEN'
import BaseFormES from '../../components/locales/base/BaseFormES'
import BaseFormPT from '../../components/locales/base/BaseFormPT'

import NavigationEN from "../../components/locales/navigation/NavigationEN";
import NavigationES from "../../components/locales/navigation/NavigationES";
import NavigationPT from "../../components/locales/navigation/NavigationPT";
import AuthenticateEN from "../../components/locales/authenticate/AuthenticateEN";
import AuthenticatePT from "../../components/locales/authenticate/AuthenticatePT";
import AuthenticateES from "../../components/locales/authenticate/AuthenticateES";

export default function getComponentLanguage(props) {
    let response = null
    switch ( props.locale) {
        case 'en': {
            switch (props.component) {
                case 'collaborations': {
                    response = CollaborationsFormEN
                    break
                }
                case 'navigation': {
                    response = NavigationEN
                    break
                }
                case 'contact': {
                    response = ContactFormEN
                    break
                }
                case 'documents': {
                    response = DocumentsFormEN
                    break
                }
                case 'base': {
                    response = BaseFormEN
                    break
                }
                case 'authenticate': {
                    response = AuthenticateEN
                    break
                }
                case 'image': {
                    response = null
                    break
                }
                case 'selector': {
                    response = null
                    break
                }
                default:
                    break
            }
            break
        }
        case 'es': {
            switch (props.component) {
                case 'collaborations': {
                    response = CollaborationsFormES
                    break
                }
                case 'navigation': {
                    response = NavigationES
                    break
                }
                case 'contact': {
                    response = ContactFormES
                    break
                }
                case 'documents': {
                    response = DocumentsFormES
                    break
                }
                case 'base': {
                    response = BaseFormES
                    break
                }
                case 'authenticate': {
                    response = AuthenticateES
                    break
                }
                case 'image': {
                    response = null
                    break
                }
                case 'selector': {
                    response = null
                    break
                }
                default:
                    break
            }
            break
        }
        case 'pt': {
            switch (props.component) {
                case 'collaborations': {
                    response = CollaborationsFormPT
                    break
                }
                case 'navigation': {
                    response = NavigationPT
                    break
                }
                case 'contact': {
                    response = ContactFormPT
                    break
                }
                case 'documents': {
                    response = DocumentsFormPT
                    break
                }
                case 'base': {
                    response = BaseFormPT
                    break
                }
                case 'authenticate': {
                    response = AuthenticatePT
                    break
                }
                case 'image': {
                    response = null
                    break
                }
                case 'selector': {
                    response = null
                    break
                }
                default:
                    break
            }
            break
        }
        default: break
    }

    return response
}
getComponentLanguage.propTypes = {
    locale: PropTypes.string,
    component: PropTypes.string
}