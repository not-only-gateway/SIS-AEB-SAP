import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default function getQuery(suffix, relations = {}) {
    return {
        url: Host() + 'list/' + suffix,
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            if (pack) {
                let value = {...pack}
                value.filters = typeof value.filters === 'string' ? JSON.parse(value.filters) : value.filters
                if (relations !== null && relations !== undefined && pack && pack.filters) {
                    if (relations) Object.keys(relations).forEach(e => {
                        value.filters.push({
                            key: e,
                            value: relations[relations],
                            type: 'object'
                        })
                    })

                }

                value.filters.forEach((e, index) => {
                    if (e.type === 'object' && typeof e.value === 'object')
                        value.filters[index] = {...e, value: e.value.id}
                })

                return value
            } else
                return pack
        },
        fetchSize: 15
    }
}