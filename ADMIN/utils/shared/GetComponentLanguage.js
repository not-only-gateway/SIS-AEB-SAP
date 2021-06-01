import PropTypes from 'prop-types'
import ContactFormEN from '../../packages/component locales/contact/ContactFormEN'
import ContactFormPT from '../../packages/component locales/contact/ContactFormPT'
import DocumentsFormEN from '../../packages/component locales/documents/DocumentsFormEN'
import DocumentsFormPT from '../../packages/component locales/documents/DocumentsFormPT'
import CollaborationsFormEN from '../../packages/component locales/collaborations/CollaborationsFormEN'
import CollaborationsFormPT from '../../packages/component locales/collaborations/CollaborationsFormPT'
import BaseFormEN from '../../packages/component locales/base/BaseFormEN'
import BaseFormPT from '../../packages/component locales/base/BaseFormPT'
import NavigationEN from "../../packages/component locales/navigation/NavigationEN";
import NavigationPT from "../../packages/component locales/navigation/NavigationPT";
import AuthenticateEN from "../../packages/component locales/authenticate/AuthenticateEN";
import AuthenticatePT from "../../packages/component locales/authenticate/AuthenticatePT";
import * as simpleEN from '../../packages/component locales/forms/SimpleFormsEN'
import * as simplePT from '../../packages/component locales/forms/SimpleFormsPT'
import AccessProfilePT from "../../packages/component locales/access/AccessProfilePT";
import AccessProfileEN from "../../packages/component locales/access/AccessProfileEN";
import MembershipEN from "../../packages/component locales/membership/MembershipEN";
import MembershipPT from "../../packages/component locales/membership/MembershipPT";
import AddressEN from "../../packages/component locales/address/AddressEN";

import SelectorsEN from "../../packages/component locales/selector/SelectorsEN";
import SelectorsPT from "../../packages/component locales/selector/SelectorsPT";
import ActivityOverviewPT from "../../packages/component locales/activity/ActivityOverviewPT";
import ActivityOverviewEN from "../../packages/component locales/activity/ActivityOverviewEN";
import UnitFormEN from "../../packages/component locales/unit/UnitFormEN";
import UnitFormPT from "../../packages/component locales/unit/UnitFormPT";

export default function getComponentLanguage(props) {
    let response = null
    switch (props.locale) {
        case 'en': {
            switch (props.component) {
                case 'activityOverview': {
                    response = ActivityOverviewEN
                    break
                }
                case 'unitForm': {
                    response = UnitFormEN
                    break
                }
                case 'collaborationForm': {

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
                case 'selector': {
                    response = SelectorsEN
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
                case 'extensionsFilter': {
                    response = ExtensionsFilterEN
                    break
                }
                case 'extension': {
                    response = ExtensionEN
                    break
                }
                default:
                    break
            }
            break
        }
        case 'pt': {
            switch (props.component) {
                case 'activityOverview': {
                    response = ActivityOverviewPT
                    break
                }
                case 'unitForm': {
                    response = UnitFormPT
                    break
                }
                case 'collaborationForm': {
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
                case 'selector': {
                    response = SelectorsPT
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
                case 'extensionsFilter': {
                    response = ExtensionsFilterPT
                    break
                }
                case 'extension': {
                    response = ExtensionPT
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