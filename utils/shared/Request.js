import PropTypes from 'prop-types'
import axios from "axios";
import Cookies from "universal-cookie/lib";

export default async function makeRequest(props){
    let response = null
    await axios({
        method: props.method,
        url: props.host + props.url,
        headers: props.doNotAuthenticate === false ? null : {'authorization': (new Cookies()).get('jwt')},
        data: props.method !== 'get' ? props.package : null,
        params: props.method === 'get' ? props.package : null,
    }).then(res => {
        response = {
            data: res.data,
            error: false,
            errorMessage: null
        }
    }).catch(error => {
        console.log(error)
        response = {
            error: error,
            errorMessage: error.message
        }
    })
    return response
}

makeRequest.propTypes={
    package: PropTypes.object,
    method: PropTypes.string,
    url: PropTypes.string,
    doNotAuthenticate: PropTypes.bool,
    host: PropTypes.string
}