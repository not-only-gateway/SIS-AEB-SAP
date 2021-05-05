import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

export default async function fetchMember(memberID){
    let response = null
    await axios({
        method: 'get',
        url: Host() + 'member/'+memberID,
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
    }).then(res => {
        response = res.data
        response.entity = {key: response.entity.id, value: response.entity.acronym}
    }).catch(error => {
        console.log(error)
    })
    return response
}