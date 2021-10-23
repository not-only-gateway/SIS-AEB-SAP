import PropTypes from "prop-types";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import Requester from "../../../../core/feedback/requester/Requester";

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
    console.log(data)
    await Requester({
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
        console.log(e)
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