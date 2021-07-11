import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitPop(props) {
    let response = {
        id: props.pk,
        status: false
    }
    let data = {}
    data = Object.assign(data, props.data)
    data.subject = props.subjectID
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    if (typeof (data.image) !== 'string' && data.image !== null && data.image !== undefined) {
        data.image = await toBase64(data.image).catch(e => Error(e))
    }
    data.current = null
    data.children = null
    console.log(data)
    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'pop' : Host() + 'pop/' + props.pk,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: data
    }).then(res => {
        response = {
            id: res.data.data,
            status: true
        }
        props.setStatus({
            type: 'success',
            message: res.status + ' - ' + res.statusText,
        })

    }).catch(error => {
        props.setStatus({
            type: 'error',
            message: error.message
        })
    })
    return response
}

submitPop.propTypes = {
    subjectID: PropTypes.number,
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
}