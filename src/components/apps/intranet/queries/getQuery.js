import Cookies from "universal-cookie/lib";
import Host from "../utils/Host";

const cookies = new Cookies()

export default function getQuery(suffix, relations={}){
    return {
        url: Host() + 'list/'+suffix,
        headers: {'authorization': cookies.get('jwt')},
        parsePackage: pack => {
            let value = {...pack}
            if(relations !== null && relations !== undefined && pack && pack.fields) {
                if (relations) Object.keys(relations).forEach(e => {
                    value.fields.push({
                        key: e,
                        value: relations[relations],
                        type: 'object'
                    })
                })

            }

            value.fields?.reduce(e => {
                if(e.type === 'object' && typeof e.value === 'object')
                    return {...e, value: e.value.id}
                else
                    return e
            })

            return value
        },
        fetchSize: 15
    }
}