import PropTypes from "prop-types";
import Host from "./Host";
import Cookies from "universal-cookie/lib";
import Requester from "../../../../core/feedback/requester/Requester";

export default async function deleteEntry(props) {
    let response = {
        data: null,
        success: false
    }

    await Requester({
        method: 'delete',
        url: props.url ? props.url : Host() + props.suffix,
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: props.customPackage ? props.customPackage : {
            identifier: props.pk
        }
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

deleteEntry.propTypes = {
    suffix: PropTypes.string,
    pk: PropTypes.any,
    url: PropTypes.string,
    customPackage: PropTypes.object
}