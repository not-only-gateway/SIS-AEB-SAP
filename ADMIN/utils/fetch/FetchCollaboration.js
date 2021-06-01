import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

export default async function fetchCollaboration(props) {
    let response = null

    if(props.setLoading !== undefined)
        props.setLoading(true)

    await axios({
        method: 'get',
        url: Host() + 'collaboration/' + props.collaborationID,
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        params: {
            authorization_token: (new Cookies()).get('authorization_token')
        }
    }).then(res => {
        response = res.data
        if(props.setLoading !== undefined)
            props.setLoading(false)
    }).catch(error => {
        console.log(error)
    })
    return response
}

fetchCollaboration.propTypes = {
    setLoading: PropTypes.func,
    collaborationID: PropTypes.number
}