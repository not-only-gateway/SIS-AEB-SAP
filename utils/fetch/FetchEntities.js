import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
const cookies = new Cookies()
export default async function fetchEntities(){
    let response = null
    await axios({
        method: 'get',
        url: Host() + 'entities',
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
    }).then(res => {
        response = res.data
    }).catch(error => {
        console.log(error)
    })
    return response
}