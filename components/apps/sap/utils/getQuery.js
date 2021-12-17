
import Cookies from "universal-cookie/lib";
import Host from "./host";



export default function getQuery(suffix, relations = {}, deep_relations = []) {

    return {
        url: Host(suffix) + 'list/' + suffix,
        headers: {'authorization': (new Cookies()).get('jwt')},
        parsePackage: pack => {

            let value = {...pack}
            value.filters = typeof value.filters === 'string' ? JSON.parse(value.filters) : value.filters
            if (relations !== null && relations !== undefined && pack && pack.filters) {

                Object.keys(relations).forEach(e => {
                    value.filters.push({
                        key: e,
                        value: relations[e],
                        type: 'object'
                    })
                })
            }
            value.filters = [...value.filters, ...deep_relations]
            value.filters.forEach((e, index) => {
                let newObj
                if (e.type === 'object' && e.value && typeof e.value === 'object') {
                    newObj = {...e, value: e.object_identifier ? e.value[e.object_identifier] : e.value.id}
                }
                else
                    newObj = {...e, value: e.value}

                delete newObj.query
                value.filters[index] = newObj
            })

            return value
        },
        fetchSize: 15
    }
}