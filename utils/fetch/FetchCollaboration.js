import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

export default async function fetchCollaboration(props) {
    let response = null
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
        if (response.senior)
            response.senior = {key: response.senior.id, value: response.senior.name}
        if (response.effective_role) {
            response.effective_role = {key: response.effective_role.id, value: response.effective_role.denomination}
        }
        if (response.commissioned_role) {
            response.commissioned_role = {
                key: response.commissioned_role.id,
                value: response.commissioned_role.denomination
            }
        }
        console.log('this is ACCESS PROFILE')
        response.access_level_profile = {
            key: response.access_level_profile.id,
            value: response.access_level_profile.denomination
        }
        console.log(response.access_level_profile)
        response.unit = {key: response.unit.id, value: response.unit.acronym}
        response.linkage = {key: response.linkage.id, value: response.linkage.denomination}

        props.setLoading(false)
    }).catch(error => {
        console.log(error)
    })
    return response
}

fetchCollaboration.propTypes = {
    setCollaboration: PropTypes.func,
    setLoading: PropTypes.func,
    collaborationID: PropTypes.number
}