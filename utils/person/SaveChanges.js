import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

export default async function saveComponentChanges(props){
    let response = false
    let data = props.params;
    Object.assign(data, {authorization_token: (new Cookies()).get('authorization_token')})

    await axios({
        method: props.method,
        url: Host() + props.path,
        headers: {'authorization': (new Cookies()).get('jwt')},
        data: data
    }).then(() => {
        response = true
    }).catch(error => {
        console.log(error)
    })
    return response
}

saveComponentChanges.propTypes={
    path: PropTypes.string,
    params: PropTypes.object,
    method: PropTypes.string
}