import {Requester} from "mfc-core";
import Host from "../components/apps/management/utils/shared/Host";
import Cookies from "universal-cookie/lib";

export async function fetchProfile() {
    let person = null
    let collaborator = null
    let tokenData
    await Requester({
        method: 'get',
        url: Host('auth') + '/authentication',
        headers: {'authorization': (new Cookies()).get('jwt')}
    }).then(res => {
        tokenData = res.data
    }).catch(e => {
        console.log(e)
    })

    if (tokenData) {
        await Requester({
            method: 'get',
            url: Host('api') + '/person/' + tokenData.person,
            headers: {'authorization': (new Cookies()).get('jwt')}
        }).then(res => {
            person = res.data
        }).catch(e => {
            console.log(e)
        })
        await Requester({
            method: 'get',
            url: Host('api') + '/collaborator/' + tokenData.person,
            headers: {'authorization': (new Cookies()).get('jwt')}
        }).then(res => {
            collaborator = res.data
        }).catch(e => {
            console.log(e)
        })
    }

    return {
        collaborator: collaborator,
        person: person
    }
}