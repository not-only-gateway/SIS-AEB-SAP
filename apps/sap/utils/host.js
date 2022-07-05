import HOST_URL from "../../../HOST_URL";

export default function Host(suffix){
    return `${HOST_URL}/api/${suffix === 'unit' ? 'rh' : 'sap'}/`
}
