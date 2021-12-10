import getHostAddress from "../../../../getHostAddress";

export default function Host(prefix){
        return `${getHostAddress()}/${prefix}/`
}
