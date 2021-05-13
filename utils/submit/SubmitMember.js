import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitMember(props) {
    let response = false
    let data = {}
    console.log(props)
    data = Object.assign(data, props.data)

    data.authorization_token = cookies.get('authorization_token')
    data.person = props.personID
    data.entity = props.data.entity.id
    if(!props.create && data.main_collaboration !== null)
        data.main_collaboration = data.main_collaboration.key
    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'member' : Host() + 'member/' + props.personID,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: data
    }).then(() => {
        response = true
    }).catch(error => {
        console.log(error)
    })
    return response
}

submitMember.propTypes = {
    personID: PropTypes.number,
    data: PropTypes.object,
    create: PropTypes.bool
}