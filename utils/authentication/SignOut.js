import axios from "axios";
import Host from "../shared/Host";
import ClearStorage from "./ClearStorage";
import Cookies from "universal-cookie/lib";

export default async function signOut() {
    try {
        await axios({
            method: 'delete',
            url: Host() + 'auth',
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
