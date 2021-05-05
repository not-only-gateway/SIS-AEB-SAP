import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
const cookies = new Cookies()
export default async function fetchCanBeMain(personID){
    let response = false
    await axios({
        method: 'get',
        url: Host() + 'main/collaboration/'+personID,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        params:{
            authorization_token: cookies.get('authorization_token')
        }
    }).then(() => {
        response = false
    }).catch(error => {
        console.log(error)
        response = true
    })
    return response
}