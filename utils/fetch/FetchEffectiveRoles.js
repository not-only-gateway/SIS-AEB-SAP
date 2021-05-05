import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

export default async function fetchEffectiveRoles() {
    let response = []

    await axios({
        method: 'get',
        url: Host() + 'roles/effective',
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
    }).then(res => {
        response = res.data
    }).catch(error => {
        console.log(error)
    })
    return response
}
