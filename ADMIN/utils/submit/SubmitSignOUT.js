import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import ClearStorage from "../authentication/ClearStorage";

export default async function submitSignOUT() {
    let resp = false
    await axios({
        method: 'delete',
        url:'http://192.168.0.211:8000/api/authentication',
        headers: {'authorization': (new Cookies()).get('jwt')}
    }).then(() => {
        ClearStorage().catch(e => console.log(e))
        resp = true
    }).catch(error => {
        console.log(error)
    })
    return resp
}
