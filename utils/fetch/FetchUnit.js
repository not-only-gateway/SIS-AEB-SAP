import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

export default async function fetchUnit(unitID) {
    let response = null
    await axios({
        method: 'get',
        url: Host() + 'unit/' + unitID,
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
    }).then(res => {
        response = res.data
        response.parent_entity = {key: response.parent_entity.id, value: response.parent_entity.name}
        if (response.parent_unit !== null)
            response.parent_unit = {key: response.parent_unit.id, value: response.parent_unit.name}
    }).catch(error => {
        console.log(error)
    })
    return response
}