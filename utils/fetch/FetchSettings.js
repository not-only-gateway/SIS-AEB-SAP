import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

export default async function fetchSettingsData(){
    let response = []
    await axios({
        method: 'get',
        url: Host() + 'collaborations/active',
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
    }).then(res => {
        response = res.data
        console.log(res)
    }).catch(error => {
        console.log(error)
    })

    return response
}