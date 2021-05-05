import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitMember(props) {
    let response = false
    props.data.authorization_token = cookies.get('authorization_token')
    props.data.person = props.personID
    props.data.entity = props.data.entity.id
    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'member' : Host() + 'member/' + props.personID,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: props.data
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