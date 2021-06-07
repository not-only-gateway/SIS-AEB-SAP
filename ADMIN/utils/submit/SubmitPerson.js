import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'
import capitalizeFirstLetter from "../shared/CapitalizeFirstLetter";

export default async function submitPerson(props) {
    let data = {}
    data = Object.assign(data, props.person)

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

    if (typeof (data.image) !== 'string' && data.image !== null && data.image !== undefined) {
        data.image = await toBase64(data.image).catch(e => Error(e))
    } else
        data.removed_image = true

    await axios({
        method: props.create === true ? 'post' : 'put',
        url: props.create ? Host() + 'person' : Host() + 'person/' + props.personID,
        headers: {'authorization': (new Cookies()).get('jwt')},
        data: data
    }).then(res => {
        response = {
            status: true,
            id: res.data.id
        }
    }).catch(error => {
        props.setStatus({
            error: true,
            message: error.message
        })
        console.log(error)
    })

    return response
}

submitPerson.propTypes = {
    person: PropTypes.object,
    image: PropTypes.object,
    create: PropTypes.bool,
    personID: PropTypes.string,
    setStatus: PropTypes.func
}