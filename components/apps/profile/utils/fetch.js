import {request} from "mfc-core";
import Host from "../../management/utils/host";
import Cookies from "universal-cookie/lib";


export async function fetchDrafts() {
    let response = null
    await request({
        method: 'get',
        url: Host('draft') + '/list',
        headers: {'authorization': (new Cookies()).get('jwt')}
    }).then(res => {
        response = res.data
    }).catch(e => {

    })
    return response
}

export async function fetchPrivileges() {
    let response = null
    await request({
        method: 'get',
        url: Host('auth') + '/access_profile/privileges',
        headers: {'authorization': (new Cookies()).get('jwt')}
    }).then(res => {
        response = res.data
    }).catch(e => {

    })
    return response
}