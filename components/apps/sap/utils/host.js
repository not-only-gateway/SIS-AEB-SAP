import getHostAddress from "../../../../getHostAddress";

export default function Host(){
    return `http://${getHostAddress()}/sap/api/`
}
