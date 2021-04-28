import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

export default async function fetchComponentData(props){
    let response = null
    let params = props.params;
    Object.assign(params, {authorization_token: (new Cookies()).get('authorization_token')})

    await axios({
        method: 'get',
        url: Host() + props.path,
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        params: params
    }).then(res => {
        response = res.data
    }).catch(error => {
        console.log(error)
    })

    return response
}

fetchComponentData.propTypes={
    path: PropTypes.string,
    params: PropTypes.object
}