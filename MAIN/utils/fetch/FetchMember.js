import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

export default async function fetchMember(props){
    let response = null
    await axios({
        method: 'get',
        url: Host() + 'member/'+props.memberID,
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
    }).then(res => {
        response = res.data
    }).catch(error => {
        props.setStatus({
            error: true,
            message: error.message
        })
    })
    return response
}

fetchMember.propTypes={
    memberID: PropTypes.number,
    setStatus: PropTypes.func,
}