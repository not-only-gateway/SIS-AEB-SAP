import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()
export default async function fetchAllCollaborations(memberID) {
    let response = []

    await axios({
        method: 'get',
        url: Host() + 'collaborations/all/'+memberID,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        params:{
            authorization_token: cookies.get('authorization_token')
        }
    }).then(res => {
        response = res.data
    }).catch(error => {
        console.log(error)
    })
    return response
}

