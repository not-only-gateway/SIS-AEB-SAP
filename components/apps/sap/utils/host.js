import getHostAddress from "../../../addons/getHostAddress";

export default function Host(suffix){
    return `${getHostAddress()}/api/${suffix === 'unit' ? 'rh' : 'sap'}/`
}
