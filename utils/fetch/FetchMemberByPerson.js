import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

export default async function fetchMemberByPerson(props){
    let response = null
    await axios({
        method: 'get',
        url: Host() + 'person/member/' + props.personID,
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

fetchMemberByPerson.propTypes={

    setStatus: PropTypes.func,
    personID: PropTypes.number
}