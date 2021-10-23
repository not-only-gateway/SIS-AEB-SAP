import PropTypes from 'prop-types'
import Cookies from "universal-cookie/lib";
import Requester from "../components/core/feedback/requester/Requester";
import Host from "./Host";

const cookies = new Cookies()
export default async function submitAuthentication(props) {
    let res = false

    await new Requester({
        package: {
            email: `${props.email}${props.asManager ? '' : '@aeb.gov.br'}`,
            password: props.password,
            platform: navigator.platform,
            browser_version: navigator.appVersion,
            browser_engine: navigator.product,
            user_agent: navigator.userAgent
        },
        url:`${Host(!props.asManager ? 'auth' : 'gateway')}${!props.asManager ? '/authentication' : '/manager/authenticate'}`,
        method: 'post',
        showSuccessAlert: true
    }).then(response => {
        if (props.asManager) {
            cookies.set('jwt', response.data.token)
            cookies.set('asManager', true)
        }
        else
            cookies.set('jwt', response.data.token, {expires: new Date(response.data.exp)})
        res = true
    }).catch(e => {
        res = false
    })


    return res
}
submitAuthentication.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    asManager: PropTypes.bool
}
