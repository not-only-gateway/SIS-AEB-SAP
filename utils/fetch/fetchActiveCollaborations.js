import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

export default async function fetchActiveCollaborations(memberID){
    let response = []
    await axios({
        method: 'get',
        url: Host() + 'active/collaborations/'+memberID,
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        params: {
            authorization_token: (new Cookies()).get('authorization_token')
        }
    }).then(res => {
        response = res.data

    }).catch(error => {
        console.log(error)
    })
    return response
}