import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()
export const service_query = {
    url: Host('management/') + 'list/service',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}
export const endpoint_query = {
    url: Host('management/') + 'list/endpoint',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}