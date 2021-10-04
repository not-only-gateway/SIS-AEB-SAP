import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export function project_query(relations) {
    return {
        url: Host() + 'list/project',
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

export function risk_query(relations) {
    return {
        url: Host() + 'list/risk',
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

export function project_goal_query(relations) {
    return {
        url: Host() + 'list/goal_project',
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
