import PropTypes from 'prop-types'
import ContactFormEN from '../../packages/component locales/contact/ContactFormEN'
import ContactFormES from '../../packages/component locales/contact/ContactFormES'
import ContactFormPT from '../../packages/component locales/contact/ContactFormPT'

import DocumentsFormEN from '../../packages/component locales/documents/DocumentsFormEN'
import DocumentsFormES from '../../packages/component locales/documents/DocumentsFormES'
import DocumentsFormPT from '../../packages/component locales/documents/DocumentsFormPT'

import CollaborationsFormEN from '../../packages/component locales/collaborations/CollaborationsFormEN'
import CollaborationsFormES from '../../packages/component locales/collaborations/CollaborationsFormES'
import CollaborationsFormPT from '../../packages/component locales/collaborations/CollaborationsFormPT'

import BaseFormEN from '../../packages/component locales/base/BaseFormEN'
import BaseFormES from '../../packages/component locales/base/BaseFormES'
import BaseFormPT from '../../packages/component locales/base/BaseFormPT'

import NavigationEN from "../../packages/component locales/navigation/NavigationEN";
import NavigationES from "../../packages/component locales/navigation/NavigationES";
import NavigationPT from "../../packages/component locales/navigation/NavigationPT";
import AuthenticateEN from "../../packages/component locales/authenticate/AuthenticateEN";
import AuthenticatePT from "../../packages/component locales/authenticate/AuthenticatePT";
import AuthenticateES from "../../packages/component locales/authenticate/AuthenticateES";
import * as simpleEN from '../../packages/component locales/forms/SimpleFormsEN'
import * as simpleES from '../../packages/component locales/forms/SimpleFormsES'
import * as simplePT from '../../packages/component locales/forms/SimpleFormsPT'
import AccessProfilePT from "../../packages/component locales/access/AccessProfilePT";
import AccessProfileES from "../../packages/component locales/access/AccessProfileES";
import AccessProfileEN from "../../packages/component locales/access/AccessProfileEN";
import MembershipEN from "../../packages/component locales/membership/MembershipEN";
import MembershipES from "../../packages/component locales/membership/MembershipES";
import MembershipPT from "../../packages/component locales/membership/MembershipPT";
import AddressEN from "../../packages/component locales/address/AddressEN";
import AddressES from "../../packages/component locales/address/AddressES";
import AddressPT from "../../packages/component locales/address/AddressPT";

export default function getComponentLanguage(props) {
    let response = null
    switch (props.locale) {
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
                case 'access': {
                    response = AccessProfileEN
                    break
                }
                case 'linkage': {
                    response = simpleEN.linkage
                    break
                }
                case 'commissioned': {
                    response = simpleEN.commissioned
                    break
                }
                case 'effective': {
                    response = simpleEN.effective
                    break
                }
                case 'membership': {
                    response = MembershipEN
                    break
                }
                case 'address': {
                    response = AddressEN
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
                case 'access': {
                    response = AccessProfileES
                    break
                }
                case 'linkage': {
                    response = simpleES.linkage
                    break
                }
                case 'commissioned': {
                    response = simpleES.commissioned
                    break
                }
                case 'effective': {
                    response = simpleES.effective
                    break
                }
                case 'membership': {
                    response = MembershipES
                    break
                }
                case 'address': {
                    response = AddressES
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
                case 'access': {
                    response = AccessProfilePT
                    break
                }
                case 'linkage': {
                    response = simplePT.linkage
                    break
                }
                case 'commissioned': {
                    response = simplePT.commissioned
                    break
                }
                case 'effective': {
                    response = simplePT.effective
                    break
                }
                case 'membership': {
                    response = MembershipPT
                    break
                }
                case 'address': {
                    response = AddressPT
                    break
                }
                default:
                    break
            }
            break
        }
        default:
            break
    }

    return response
}
getComponentLanguage.propTypes = {
    locale: PropTypes.string,
    component: PropTypes.string
}