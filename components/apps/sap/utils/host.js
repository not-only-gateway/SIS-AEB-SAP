import getHostAddress from "../../../../getHostAddress";

export default function Host(suffix){
    return `${getHostAddress()}/api/${suffix === 'unit' ? 'structural' : 'sap'}/`
}
