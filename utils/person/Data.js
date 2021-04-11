import axios from "axios";
import Host from "../shared/Host";
import PropTypes from 'prop-types'
import Cookies from "universal-cookie/lib";

export async function fetchPersonData(props) {
    let response = null
    await axios({
        method: 'get',
        url: Host() + props.path,
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        params: props.params
    }).then(res => {
        response = res.data
    }).catch(error => {
        console.log(error)
    })

    return response
}

fetchPersonData.propTypes={
    path: PropTypes.string,
    params: PropTypes.object
}

export async function savePersonChanges(props) {
    let response = false

    await axios({
        method: props.method,
        url: Host() + props.path,
        headers: {'authorization': (new Cookies()).get('jwt')},
        data: props.params
    }).then(() => {
        response = true
    }).catch(error => {
        console.log(error)
    })
    return response
}

savePersonChanges.propTypes={
    path: PropTypes.string,
    params: PropTypes.object,
    method: PropTypes.string
}