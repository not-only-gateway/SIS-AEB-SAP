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

    data.access_profile = data.access_profile.id
    data.unit = data.unit.id
    data.linkage = data.linkage.id

    if (data.senior_member)
        data.senior_member = data.senior_member.id

    if (data.commissioned_role)
        data.commissioned_role = data.commissioned_role.key
    if (data.effective_role)
        data.effective_role = data.effective_role.key
    data.member = props.memberID
    // console.log('THIS IS DATA')
    // console.log(props.data)
    // console.log(data)
    await axios({
        method: props.create ? 'post': 'put',
        url: !props.create ? (Host() + 'collaboration/' + props.collaborationID) :(Host() + 'collaboration'),
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: data
    }).then(() => {
        response = true
    }).catch(error => {
        console.log(error)
    })
    return response
}

submitCollaboration.propTypes = {
    create: PropTypes.bool,
    data: PropTypes.object,
    memberID: PropTypes.number,
    collaborationID: PropTypes.any
}