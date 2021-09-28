import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export const work_plan_query = {
    url: Host() + 'list/work_plan',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}
export const action_query = {
    url: Host() + 'list/action_item',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}
export const activity_query = {
    url: Host() + 'list/activity',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const apostille_query = {
    url: Host() + 'list/apostille',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const execution_query = {
    url: Host() + 'list/execution',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const financial_query = {
    url: Host() + 'list/financial_disbursement',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const followup_goal_query = {
    url: Host() + 'list/followup_goal',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const goal_query = {
    url: Host() + 'list/work_plan_goal',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const permanent_goods_query = {
    url: Host() + 'list/permanent_goods',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const note_query = {
    url: Host() + 'list/note',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const operation_query = {
    url: Host() + 'list/operation_phase',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const resource_query = {
    url: Host() + 'list/resource_application',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const status_query = {
    url: Host() + 'list/work_plan_status',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

