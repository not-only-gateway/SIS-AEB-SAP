import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export const work_plan = {
    url: Host() + 'list/work_plan',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}
export const action = {
    url: Host() + 'list/action_item',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}
export const activity = {
    url: Host() + 'list/activity',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const apostille = {
    url: Host() + 'list/apostille',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const execution = {
    url: Host() + 'list/execution',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const financial = {
    url: Host() + 'list/financial_disbursement',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const followup_goal = {
    url: Host() + 'list/followup_goal',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const goal = {
    url: Host() + 'list/work_plan_goal',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const permanent_goods = {
    url: Host() + 'list/permanent_goods',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const note = {
    url: Host() + 'list/note',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const operation = {
    url: Host() + 'list/operation_phase',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const resource = {
    url: Host() + 'list/resource_application',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}

export const status = {
    url: Host() + 'list/work_plan_status',
    headers: {'authorization': cookies.get('jwt')},
    parsePackage: pack => pack,
    fetchSize: 15
}