import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

export default async function fetchTopCollaborators() {
    let response = []
    await axios({
        method: 'get',
        url: Host() + 'top/collaborators',
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
    }).then(res => {
        console.log(res)
        response = res.data
    }).catch(error => {
        console.log(error)
    })
    return response
}