import {request} from "mfc-core";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import Host from "./host";

export async function fetchEntry(props) {
    let response = {}
    await request({
        method: 'get',
        url: Host(props.prefix) + props.suffix,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: {
            identifier: props.pk
        }
    }).then(res => {

        response = res.data ? res.data : {}
    }).catch(e => {

    })
    return response
}


fetchEntry.propTypes = {
    pk: PropTypes.any,
    suffix: PropTypes.string,
    prefix: PropTypes.string
}