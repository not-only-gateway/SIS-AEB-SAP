import PropTypes from "prop-types";
import Cookies from "universal-cookie/lib";
import {request} from "mfc-core";
import Host from "./host";

export default async function deleteEntry(props) {
    let response = {
        data: null,
        success: false
    }

    await request({
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