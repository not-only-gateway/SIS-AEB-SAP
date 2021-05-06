import PropTypes from "prop-types";
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()
export default async function submitLinkage(props) {
    let response = false
    props.data.authorization_token = cookies.get('authorization_token')

    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'linkage' : Host() + 'linkage/' + props.pk,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: props.data
    }).then(() => {
        response = true
    }).catch(error => {
        console.log(error)
    })
    return response
}
submitLinkage.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    create: PropTypes.bool
}