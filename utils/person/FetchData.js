import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

export default async function fetchComponentData(props){
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

fetchComponentData.propTypes={
    path: PropTypes.string,
    params: PropTypes.object
}