import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default function getQuery(suffix, relations={}){
    return {
        url: Host() + 'list/'+suffix,
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