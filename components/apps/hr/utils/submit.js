import PropTypes from "prop-types";

import Cookies from "universal-cookie/lib";
import {request} from "mfc-core";
import Host from "./Host";

export default async function submit(props){
    let response = {
        data: null,
        success: false
    }
    let data = {identifier: props.pk}
    Object.keys(props.data).forEach(d => {
        if (props.data[d] && props.data[d] !== null && !Array.isArray(props.data[d]) && typeof props.data[d] === 'object')
            data[d] = props.data[d].id
        else
            data[d] = props.data[d]
    })
    await request({
        method: props.create ? 'post' : 'put',
        url: Host()+props.suffix ,
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: data
    }).then(res => {
        response ={
            data: res.data,
            success: true
        }
    }).catch(e => {

    })
    return response
}

submit.propTypes={
    suffix:  PropTypes.string,
    data:  PropTypes.object,
    create:  PropTypes.bool,
    pk: PropTypes.any
}