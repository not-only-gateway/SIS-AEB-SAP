import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()
export const service_query = {
    url: Host('gateway/') + 'list/service',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}
export const endpoint_query = {
    url: Host('gateway/') + 'list/endpoint',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}
export const access_profile_permissions_query = (pk) => {
    return {
        url: Host('auth/') + 'access_profile/privileges/' + pk,
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => pack,
        fetchSize: 15
    }
}
export const permission_query = {
    url: Host('auth/') + 'list/privilege',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}
export const entity_query = {
    url: Host('gateway/') + 'list/entity',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const access_profile_query = {
    url: Host('auth/') + 'list/access_profile',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const event_query = {
    url: Host('api/') + 'list/event',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}