import getHostAddress from "../../../../../getHostAddress";

export default function Host(prefix) {
    return `http://${getHostAddress()}/`
}
