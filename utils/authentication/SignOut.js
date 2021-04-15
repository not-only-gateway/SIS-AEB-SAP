import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import ClearStorage from "./ClearStorage";

export default async function signOut() {
    let resp = false
    await axios({
        method: 'delete',
        url: Host() + 'access_log',
        headers: {'authorization': (new Cookies()).get('jwt')}
    }).then(() => {
        ClearStorage().catch(e => console.log(e))
        resp = true
    }).catch(error => {
        console.log(error)
    })
    return resp
}
