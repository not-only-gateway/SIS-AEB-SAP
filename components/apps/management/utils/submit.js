import PropTypes from "prop-types";
import Host from "./host";
import Cookies from "universal-cookie/lib";
import {request} from "mfc-core";

export default async function submit(props) {
    let response = {
        data: null,
        success: false
    }
    let data = {identifier: props.pk, foreign_identifier: props.fk}

    Object.keys(props.data).forEach(d => {

        if (props.data[d] && props.data[d] !== null && !Array.isArray(props.data[d]) && typeof props.data[d] === 'object')
            data[d] = props.data[d].id
        else
            data[d] = Array.isArray(props.data[d]) ? JSON.stringify(props.data[d]) : props.data[d]

    })

    await request({
        method: props.create ? 'post' : 'put',
        url: props.url ? props.url : Host(props.prefix) + props.suffix,
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: data
    }).then(res => {
        response = {
            data: res.data,
            success: true
        }
    }).catch(e => {

    })
    return response
}

submit.propTypes = {
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    data: PropTypes.object,
    create: PropTypes.bool,
    pk: PropTypes.any,
    fk: PropTypes.any,
    url: PropTypes.string
}