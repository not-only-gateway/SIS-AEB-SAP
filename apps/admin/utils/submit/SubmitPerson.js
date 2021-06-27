import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import axios from "axios";
import PropTypes from "prop-types";

export default async function submitPerson(props) {
    let data = {}
    data = Object.assign(data, props.data)

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    let response = {
        status: false,
        id: undefined
    }
    if (typeof (data.birth) === 'string')
        data.birth = new Date(data.birth.replaceAll('/', '-').replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")).getTime()
    if (typeof (data.image) !== 'string' && data.image !== null && data.image !== undefined) {
        data.image = await toBase64(data.image).catch(e => Error(e))
    } else
        data.removed_image = true

    await axios({
        method: data.id === undefined || data.id === null ? 'post' : 'put',
        url: data.id === undefined || data.id === null ? Host() + 'person' : Host() + 'person/' + props.pk,
        headers: {'authorization': (new Cookies()).get('jwt')},
        data: data
    }).then(res => {
        props.setStatus({
            type: 'success',
            message: res.status + ' - ' + res.statusText,
        })
        response = {
            status: true,
            id: res.data.id
        }
    }).catch(error => {
        props.setStatus({
            type: 'error',
            message: error.message
        })
    })

    return response

}
submitPerson.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func
}