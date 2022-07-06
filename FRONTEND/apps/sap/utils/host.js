import SERVER_CONFIG from "../../../SERVER_CONFIG.json";

export default function Host(suffix){
    return `${SERVER_CONFIG.BACKEND_HOST}/api/${suffix === 'unit' ? 'rh' : 'sap'}/`
}
