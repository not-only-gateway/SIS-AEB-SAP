import PropTypes from "prop-types";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import Requester from "../../../../core/misc/requester/Requester";

export default async function deleteEntry(props) {
    let response = {
        data: null,
        success: false
    }

    await Requester({
        method: 'delete',
        url: props.url ? props.url : Host(props.prefix) + props.suffix,
        showSuccessAlert: true,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: {
            identifier: props.pk,
            foreign_identifier: props.fk
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
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    pk: PropTypes.any,
    fk: PropTypes.any,
    url: PropTypes.string
}