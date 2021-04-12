import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import ClearStorage from "./ClearStorage";

export default async function signOut() {
    try {
        await axios({
            method: 'delete',
            url: Host() + 'access_log',
            headers: {'authorization': (new Cookies()).get('jwt')}
        }).then(() => {
            ClearStorage().catch(e => console.log(e))
        }).catch(error => {
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}
