import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export const ted_query = {
    url: Host() + 'list/ted',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}
export const addendum_query = {
    url: Host() + 'list/addendum',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}
