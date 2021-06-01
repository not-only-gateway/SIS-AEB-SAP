import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitCollaborationChange(props){
    let response = false
    await axios({
        method: 'patch',
        url: Host() + 'authentication',
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: {
            collaboration_id: props.collaborationID
        }
    }).then(res => {
        response = true
        props.setStatus({
            type: 'success',
            message: res.status + ' - ' + res.statusText
        })
    }).catch(error => {
        props.setStatus({
            type: 'error',
            message: error.message
        })
    })
    return response
}

submitCollaborationChange.propTypes={
    collaborationID: PropTypes.number,
    setStatus: PropTypes.func
}