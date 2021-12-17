import getHostAddress from "../components/addons/getHostAddress";

export default function Host(prefix){
    return `${getHostAddress()}/${prefix}`
}
