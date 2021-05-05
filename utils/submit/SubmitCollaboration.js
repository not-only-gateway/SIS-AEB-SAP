import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitCollaboration(props) {
    let response = false
    props.data.authorization_token = cookies.get('authorization_token')
    props.data.official_publication_date = new Date(props.data.official_publication_date).getTime()
    props.data.admission_date = new Date(props.data.admission_date).getTime()
    if (props.data.contract_expiration)
        props.data.contract_expiration = new Date(props.data.contract_expiration).getTime()

    props.data.access_level_profile = props.data.access_level_profile.key
    props.data.unit = props.data.unit.key
    props.data.linkage = props.data.linkage.key
    if (props.data.senior_member)
        props.data.senior_member = props.data.senior_member.key

    if (props.data.commissioned_role)
        props.data.commissioned_role = props.data.commissioned_role.key
    if (props.data.effective_role)
        props.data.effective_role = props.data.effective_role.key
    props.data.member = props.memberID

    await axios({
        method: props.create ? 'post': 'put',

        url: !props.create ? (Host() + 'collaboration/' + props.collaborationID) :(Host() + 'collaboration'),
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: props.data
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
    memberID: PropTypes.number
}