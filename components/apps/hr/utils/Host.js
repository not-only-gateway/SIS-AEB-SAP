import getHostAddress from "../../../addons/getHostAddress";

export default function Host(){
    return `${getHostAddress()}/api/cgp/`
}
