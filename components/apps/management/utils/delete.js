import PropTypes from "prop-types";
import Host from "./host";
import Cookies from "universal-cookie/lib";
import Request from "../../../core/feedback/requester/request";

export default async function deleteEntry(props) {
    let response = {
        data: null,
        success: false
    }

    await Request({
        method: 'delete',
        url: props.url ? props.url : Host(props.prefix) + props.suffix,
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: {
            identifier: props.pk,
            foreign_identifier: props.fk
        }
    }).then(res => {
        response = {
            data: res.data,
            success: true
        }
    }).catch(e => {

    })
    return response
}

deleteEntry.propTypes = {
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    pk: PropTypes.any,
    fk: PropTypes.any,
    url: PropTypes.string
}