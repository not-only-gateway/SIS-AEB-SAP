import PropTypes from 'prop-types'

import NavigationEN from "../../packages/component locales/navigation/NavigationEN";
import NavigationPT from "../../packages/component locales/navigation/NavigationPT";

import ExtensionsFilterEN from "../../packages/component locales/extensions/ExtensionsFilterEN";
import ExtensionsFilterPT from "../../packages/component locales/extensions/ExtensionsFilterPT";
import ExtensionEN from "../../packages/component locales/extensions/ExtensionEN";
import ExtensionPT from "../../packages/component locales/extensions/ExtensionPT";
import SelectorsEN from "../../packages/component locales/selector/SelectorsEN";
import SelectorsPT from "../../packages/component locales/selector/SelectorsPT";

import UnitFormEN from "../../packages/component locales/unit/UnitFormEN";
import UnitFormPT from "../../packages/component locales/unit/UnitFormPT";

export default function getComponentLanguage(props) {
    let response = null
    switch (props.locale) {
        case 'en': {
            switch (props.component) {

                case 'unitForm': {
                    response = UnitFormEN
                    break
                }

                case 'navigation': {
                    response = NavigationEN
                    break
                }

                case 'selector': {
                    response = SelectorsEN
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

                case 'unitForm': {
                    response = UnitFormPT
                    break
                }

                case 'navigation': {
                    response = NavigationPT
                    break
                }

                case 'selector': {
                    response = SelectorsPT
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