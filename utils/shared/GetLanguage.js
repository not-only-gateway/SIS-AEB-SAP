import PropTypes from 'prop-types'
import ContactFormEN from '../../locales/person/contact/ContactFormEN'
import ContactFormES from '../../locales/person/contact/ContactFormES'
import ContactFormPT from '../../locales/person/contact/ContactFormPT'

import DocumentsFormEN from '../../locales/person/documents/DocumentsFormEN'
import DocumentsFormES from '../../locales/person/documents/DocumentsFormES'
import DocumentsFormPT from '../../locales/person/documents/DocumentsFormPT'

import CollaborationsFormEN from '../../locales/person/collaborations/CollaborationsFormEN'
import CollaborationsFormES from '../../locales/person/collaborations/CollaborationsFormES'
import CollaborationsFormPT from '../../locales/person/collaborations/CollaborationsFormPT'

import BaseFormEN from '../../locales/person/base/BaseFormEN'
import BaseFormES from '../../locales/person/base/BaseFormES'
import BaseFormPT from '../../locales/person/base/BaseFormPT'

import NavigationEN from "../../locales/navigation/NavigationEN";
import NavigationES from "../../locales/navigation/NavigationES";
import NavigationPT from "../../locales/navigation/NavigationPT";

export default function getComponentLanguage(props) {
    let response = null
    switch (props.component) {
        case 'collaborations': {
            switch (props.locale) {
                case 'en': {
                    response = CollaborationsFormEN
                    break
                }
                case 'es': {
                    response = CollaborationsFormES
                    break
                }
                default: {
                    response = CollaborationsFormPT
                    break
                }
            }
            break
        }
        case 'contact': {
            switch (props.locale) {
                case 'en': {
                    response = ContactFormEN
                    break
                }
                case 'es': {
                    response = ContactFormES
                    break
                }
                default: {
                    response = ContactFormPT
                    break
                }
            }
            break
        }
        case 'documents': {
            switch (props.locale) {
                case 'en': {
                    response = DocumentsFormEN
                    break
                }
                case 'es': {
                    response = DocumentsFormES
                    break
                }
                default: {
                    response = DocumentsFormPT
                    break
                }
            }
            break
        }
        case 'base': {
            switch (props.locale) {
                case 'en': {
                    response = BaseFormEN
                    break
                }
                case 'es': {
                    response = BaseFormES
                    break
                }
                default: {
                    response = BaseFormPT
                    break
                }
            }
            break
        }
        case 'navigation': {
            switch (props.locale) {
                case 'en': {
                    response = NavigationEN
                    break
                }
                case 'es': {
                    response = NavigationES
                    break
                }
                default: {
                    response = NavigationPT
                    break
                }
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