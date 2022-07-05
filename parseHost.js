import HOST_URL from "./HOST_URL";

export default function ParseHost(suffix) {
    return `${HOST_URL}/api/${suffix ? suffix : 'sap'}/`
}
