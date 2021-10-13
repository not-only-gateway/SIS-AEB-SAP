import Requester from "../../../core/misc/requester/Requester";
import Host from "./shared/Host";
import Cookies from "universal-cookie/lib";

export default async function deleteEntry({pk, path}) {
    let response = false
    await Requester({
        method: 'DELETE',
        url: `${Host('gateway')}/${path}/${pk}`,
        headers: {'authorization': (new Cookies()).get('jwt')},
    }).then(res => {
        response = true
    }).catch(e => {
        console.log(e)
    })
    return response
}