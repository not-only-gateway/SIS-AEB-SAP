import PropTypes from 'prop-types'
import Cookies from "universal-cookie/lib";
import {request} from 'mfc-core'
import HOST_URL from "../HOST_URL";

const cookies = new Cookies()
export default async function submitAuthentication(props) {
    let res = null

    await request({
        package: {
            email: `${props.email}${props.asManager ? '' : '@aeb.gov.br'}`,
            password: props.password,
            platform: navigator.platform,
            browser_version: navigator.appVersion,
            browser_engine: navigator.product,
            user_agent: navigator.userAgent
        },
        url: `${HOST_URL + "/" + (!props.asManager ? 'auth' : 'gateway')}${!props.asManager ? '/authentication' : '/manager/authenticate'}`,
        method: 'post',
        showSuccessAlert: true
    }).then(response => {
        if (props.asManager) {
            cookies.set('jwt', response.data.token)
            cookies.set('asManager', true)
        } else
            cookies.set('jwt', response.data.token)
        res = response.data
    }).catch(error => console.log(error))
    return res
}
submitAuthentication.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    asManager: PropTypes.bool
}
