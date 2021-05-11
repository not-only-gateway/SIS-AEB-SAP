import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import ClearStorage from "../authentication/ClearStorage";

export default async function submitSignOUT() {
    let resp = false
    await axios({
        method: 'patch',
        url: Host() + 'authentication',
        headers: {'authorization': (new Cookies()).get('jwt')}
    }).then(() => {
        ClearStorage().catch(e => console.log(e))
        resp = true
    }).catch(error => {
        console.log(error)
    })
    return resp
}
