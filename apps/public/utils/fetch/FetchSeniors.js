import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function fetchSeniors(props) {
    let response = []

    await axios({
        method: 'get',
        url: Host() + 'seniors',
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        params: {
            authorization_token: cookies.get('authorization_token'),
            member_id: props.memberID,
            unit_id: props.unitID
        }
    }).then(res => {
        response = res.data
    }).catch(error => {
        console.log(error)
    })
    return response
}

fetchSeniors.propTypes = {
    memberID: PropTypes.number,
    unitID: PropTypes.number

}

