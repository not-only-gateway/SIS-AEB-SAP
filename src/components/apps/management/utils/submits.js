import {Requester} from "sis-aeb-core";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import Host from "./shared/Host";

const submitProps = {
    pk: PropTypes.any,
    data: PropTypes.object,
    create: PropTypes.bool
}

export async function endpoint(props) {
    let response = false
    await Requester({
        method: props.create ? 'post' : 'put',
        url:!props.create ? Host('gateway') + '/endpoint/' + props.pk : Host('/gateway') + '/endpoint',
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
        data: props.data
    }).then(res => {
        response = true
    }).catch(e => {
        console.log(e)
    })
    return response
}

export async function service(props) {
    let response = false
    await Requester({
        method: props.create ? 'post' : 'put',
        url: !props.create ? Host('gateway') + '/service/' + props.pk : Host('/gateway') + '/service',
        showSuccessAlert: true,
        token: (new Cookies()).get('jwt'),
        data: props.data
    }).then(res => {
        response = true
    }).catch(e => {
        console.log(e)
    })
    return response
}

export async function accessProfile(props) {
    let response = false
    await Requester({
        method: props.create ? 'post' : 'put',
        url: !props.create ? Host('auth') + '/access_profile/' + props.pk : Host('auth') + '/access_profile',
        showSuccessAlert: true,
        token: (new Cookies()).get('jwt'),
        data: props.data
    }).then(res => {
        response = true
    }).catch(e => {
        console.log(e)
    })
    return response
}

export async function permission(props) {
    let response = false
    await Requester({
        method: props.create ? 'post' : 'put',
        url: !props.create ? Host('gateway') + '/permission/' + props.pk : Host('gateway') + '/permission',
        showSuccessAlert: true,
        token: (new Cookies()).get('jwt'),
        data: props.data
    }).then(res => {
        response = true
    }).catch(e => {
        console.log(e)
    })
    return response
}
endpoint.propTypes = submitProps
service.propTypes = submitProps