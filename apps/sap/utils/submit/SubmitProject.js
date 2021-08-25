import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'
import Requester from "../../components/shared/misc/requester/Requester";

const jwt = (new Cookies()).get('jwt')

export default async function submitProject(props) {
    let response = props.create ? null : false
    await Requester({
        package: props.data,
        url: props.create ? Host() + 'project' : Host() + 'project/' + props.pk,
        method: props.create ? 'post' : 'put',
        showSuccessAlert: true,
        token: jwt
    }).then(res => {
        response = props.create ? res.data.id : true
    }).catch(e => {
        console.log(e)
    })

    return response
}

submitProject.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
}