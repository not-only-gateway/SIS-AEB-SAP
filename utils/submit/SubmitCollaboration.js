import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()

export default async function submitCollaboration(props) {
    let response = false
    let data = {}

    data = Object.assign(data, props.data)

    data.authorization_token = cookies.get('authorization_token')
    data.official_publication_date = new Date(data.official_publication_date).getTime()
    data.admission_date = new Date(data.admission_date).getTime()
    if (data.contract_expiration)
        data.contract_expiration = new Date(data.contract_expiration).getTime()

    data.access_profile = data.access_profile.key
    data.unit = data.unit.key
    data.linkage = data.linkage.key

    if (data.senior_member)
        data.senior_member = data.senior_member.id

    if (data.commissioned_role !== undefined && data.commissioned_role !== null)
        data.commissioned_role = data.commissioned_role.key
    if (data.effective_role !== undefined && data.effective_role !== null)
        data.effective_role = data.effective_role.key
    data.member = props.memberID
    console.log(props.data)
    console.log(data)
    await axios({
        method: props.create ? 'post': 'put',
        url: !props.create ? (Host() + 'collaboration/' + props.collaborationID) :(Host() + 'collaboration'),
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: data
    }).then(res => {
        props.setStatus({
            type: 'success',
            message: res.status + ' - ' + res.statusText
        })
        response = true
    }).catch(error => {
        props.setStatus({
            type: 'error',
            message: error.message
        })

    })
    return response
}

submitCollaboration.propTypes = {
    create: PropTypes.bool,
    data: PropTypes.object,
    memberID: PropTypes.number,
    collaborationID: PropTypes.any,
    setStatus: PropTypes.func
}