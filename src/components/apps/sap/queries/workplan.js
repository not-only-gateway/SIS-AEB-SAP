import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export function work_plan_query(relations) {
    return {
        url: Host() + 'list/work_plan',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

export function action_query(relations) {
    return {
        url: Host() + 'list/action_item',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

export function activity_query(relations) {
    return {
        url: Host() + 'list/activity',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

export function apostille_query(relations) {
    return {
        url: Host() + 'list/apostille',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

export function execution_query(relations) {
    return {
        url: Host() + 'list/execution',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

export function financial_query(relations) {
    return {
        url: Host() + 'list/financial_disbursement',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

export function followup_goal_query(relations) {
    return {
        url: Host() + 'list/followup_goal',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

export function goal_query(relations) {
    return {
        url: Host() + 'list/work_plan_goal',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

export function permanent_goods_query(relations) {
    return {
        url: Host() + 'list/permanent_goods',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

export function note_query(relations) {
    return {
        url: Host() + 'list/note',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

export function operation_query(relations) {
    return {
        url: Host() + 'list/operation_phase',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

export function resource_query(relations) {
    return {
        url: Host() + 'list/resource_application',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

export function status_query(relations) {
    return {
        url: Host() + 'list/work_plan_status',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations) Object.keys(relations).forEach(e => {
                value.fields.push({
                    key: e,
                    value: relations[relations],
                    type: 'object'
                })
            })
            return value
        },
        fetchSize: 15
    }
}

