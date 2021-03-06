import PropTypes from "prop-types";

import Cookies from "universal-cookie/lib";
import {request} from "mfc-core";
import SERVER_CONFIG from "../../../SERVER_CONFIG.json";

export default async function deleteEntry(props) {
    let response = {
        data: null,
        success: false
    }

    await request({
        method: 'delete',
        url: props.url ? props.url : SERVER_CONFIG.BACKEND_HOST + '/' + props.suffix,
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: props.customPackage ? props.customPackage : {
            identifier: props.pk
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
    suffix: PropTypes.string,
    pk: PropTypes.any,
    url: PropTypes.string,
    customPackage: PropTypes.object
}