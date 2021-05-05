import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

export default async function FetchMainCollaboration(memberID){
    let response = null
    await axios({
        method: 'get',
        url: Host() + 'main/collaboration/'+memberID,
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
    }).then(res => {
        response = res.data
    }).catch(error => {
        console.log(error)
    })
    return response
}