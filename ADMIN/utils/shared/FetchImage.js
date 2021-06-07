import axios from "axios";
import Host from "./Host";
import Cookies from "universal-cookie/lib";


const cookies = new Cookies()
export default async function FetchImage(url){
    let response = null
    await axios({
        method: 'get',
        url: Host() + 'image/person',
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        params: {
            url: url
        }
    }).then(res => {
        response = res.data

    }).catch(error => {
        console.log(error)
    })
    return response
}