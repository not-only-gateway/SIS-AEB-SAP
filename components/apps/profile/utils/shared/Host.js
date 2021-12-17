import getHostAddress from "../../../../addons/getHostAddress";

export default function Host(prefix) {
    return `${getHostAddress()}/`
}
