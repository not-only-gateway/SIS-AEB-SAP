import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

export default async function fetchTopUnits() {
    let response = []
    axios({
        method: 'get',
        url: Host() + 'top/units',
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
    }).then(res => {
        response = res.data
    }).catch(error => {
        console.log(error)
    })
    return response
}