import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
const cookies = new Cookies()
export default async function fetchDocuments(personID){
    let response = null
    await axios({
        method: 'get',
        url: Host() + 'documents/'+personID,
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