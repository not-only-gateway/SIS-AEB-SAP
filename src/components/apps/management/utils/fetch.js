import Requester from "../../../core/misc/requester/Requester";
import Host from "./shared/Host";
import Cookies from "universal-cookie/lib";

export async function fetchAccess(pk){
    let response = null
    await Requester({
        method: 'get',
        url: Host('auth') + '/access_profile/'+pk,
        headers: {'authorization': (new Cookies()).get('jwt')},
    }).then(res => {
        response = res.data
    }).catch(e => {
        console.log(e)
    })
    return response
}