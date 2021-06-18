import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitMember(props) {
    let response = {
        status: false
    }
    let data = {}
    console.log(props)
    data = Object.assign(data, props.data)

    data.authorization_token = cookies.get('authorization_token')
    data.person = props.personID
    data.entity = props.data.entity.key
    if(!props.create && data.main_collaboration !== null)
        data.main_collaboration = data.main_collaboration.key
    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'member' : Host() + 'member/' + props.memberID,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: data
    }).then(res => {
        response = {
            status: true,
            id: res.data
        }
    }).catch(error => {
        props.setStatus({
            error: true,
            message: error.message
        })
    })
    return response
}

submitMember.propTypes = {
    personID: PropTypes.number,
    memberID: PropTypes.number,
    data: PropTypes.object,
    create: PropTypes.bool,
    setStatus: PropTypes.func
}