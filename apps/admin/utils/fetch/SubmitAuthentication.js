import PropTypes from 'prop-types'
import Cookies from "universal-cookie/lib";
import Host from "../shared/Host";
import {Requester} from "sis-aeb-core";


const cookies = new Cookies()
export default async function submitAuthentication(props) {

    props.setLoading(true)
    // let ip = await publicIp.v4()
    let res = false

    await Requester({
        package:  {
            corporate_email: props.email,
            password: props.password,
            ip: '192.168.0.211',
            platform: navigator.platform,
            browser_version: navigator.appVersion,
            browser_engine: navigator.product,
            user_agent: navigator.userAgent
        },
        url: Host() + 'authentication',
        method: 'post',
        showSuccessAlert: true
    }).then(response => {
        console.log('SETTING COOKIE')
        cookies.set('jwt', response.data.token, {expires: new Date(response.data.exp)})
        console.log(cookies.get('jwt'))
        props.setLoading(false)
        res = true
    }).catch(e => {
        res = false
        console.log(e)
    })


    return res
}
submitAuthentication.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    locale: PropTypes.string,
    setLoading: PropTypes.func
}
