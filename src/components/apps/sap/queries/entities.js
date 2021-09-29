import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()
export const budget_plan_query = {
    url: Host() + 'list/budget_plan',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}
export const classification_query = {
    url: Host() + 'list/classification',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}
// export const budget_plan_query = {
//     url: Host() + 'list/permanent_goods',
//     headers: {'authorization': cookies.get('jwt')},
//     parsePackage: pack => pack,
//     fetchSize: 15
// }
// export const budget_plan_query = {
//     url: Host() + 'list/permanent_goods',
//     headers: {'authorization': cookies.get('jwt')},
//     parsePackage: pack => pack,
//     fetchSize: 15
// }
// export const budget_plan_query = {
//     url: Host() + 'list/permanent_goods',
//     headers: {'authorization': cookies.get('jwt')},
//     parsePackage: pack => pack,
//     fetchSize: 15
// }
// export const budget_plan_query = {
//     url: Host() + 'list/permanent_goods',
//     headers: {'authorization': cookies.get('jwt')},
//     parsePackage: pack => pack,
//     fetchSize: 15
// }
