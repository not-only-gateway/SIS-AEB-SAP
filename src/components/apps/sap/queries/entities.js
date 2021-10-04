import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import {object} from "prop-types";

const cookies = new Cookies()

export function budget_plan_query(relations) {
    return {
        url: Host() + 'list/budget_plan',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if (relations) Object.keys(relations).forEach(e => {
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

export function classification_query(relations) {
    return {
        url: Host() + 'list/classification',
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if (relations) Object.keys(relations).forEach(e => {
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
