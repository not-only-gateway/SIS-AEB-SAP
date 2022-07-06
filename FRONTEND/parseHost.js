import SERVER_CONFIG from "./SERVER_CONFIG.json";

export default function ParseHost(suffix) {
    return `${SERVER_CONFIG.BACKEND_HOST}/api/${suffix ? suffix : 'sap'}/`
}
