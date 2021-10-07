import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import Host from "./shared/Host";
import Requester from "../../../core/misc/requester/Requester";

const submitProps = {
    pk: PropTypes.any,
    package: PropTypes.object,
    create: PropTypes.bool
}

export async function endpoint(props) {
    let response = false
    await Requester({
        method: props.create ? 'post' : 'put',
        url: !props.create ? Host('gateway') + '/endpoint/' + props.pk : Host('gateway') + '/endpoint',
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: props.data
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
        url: !props.create ? Host('gateway') + '/service/' + props.pk : Host('gateway') + '/service',
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: props.data,
    }).then(res => {
        response = true
    }).catch(e => {
        console.log(e)
    })
    return response
}

export async function accessPrivilege({accessProfile, data}) {
    let response = null
    await Requester({
        method: 'post',
        url: Host('auth') + '/access_profile/privilege/' + accessProfile + '/' + data,
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
    }).then(res => {
        response = res.data.id
    }).catch(e => {
        console.log(e)
    })
    return response
}

export async function accessProfile(props) {
    let response = null
    await Requester({
        method: props.create ? 'post' : 'put',
        url: !props.create ? Host('auth') + '/access_profile/' + props.pk : Host('auth') + '/access_profile',
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: props.data
    }).then(res => {
        response = res.data.id
    }).catch(e => {
        console.log(e)
    })
    return response
}

export async function permission(props) {
    let response = false
    await Requester({
        method: props.create ? 'post' : 'put',
        url: !props.create ? Host('auth') + '/privilege/' + props.pk : Host('auth') + '/privilege',
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: props.data
    }).then(res => {
        response = true
    }).catch(e => {
        console.log(e)
    })
    return response
}

export async function entity(props) {
    let response = false
    await Requester({
        method: props.create ? 'post' : 'put',
        url: !props.create ? Host('gateway') + '/entity/' + props.pk : Host('gateway') + '/entity',
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: props.data
    }).then(res => {
        response = true
    }).catch(e => {
        console.log(e)
    })
    return response
}

endpoint.propTypes = submitProps
service.propTypes = submitProps