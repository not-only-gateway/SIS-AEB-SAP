import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import Requester from "../../../../core/feedback/requester/Requester";
import Host from "../shared/Host";

export async function fetchEntry(props) {
    let response = {}
    await Requester({
        method: 'get',
        url: Host() + props.suffix,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: {
            identifier: props.pk
        }
    }).then(res => {
        response = res.data !== null && res.data !== undefined ? res.data : {}
    }).catch(e => {
        console.log(e)
    })
    return response
}


fetchEntry.propTypes = {
    pk: PropTypes.any,
    suffix: PropTypes.string
}