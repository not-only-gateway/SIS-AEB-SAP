import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import {Requester} from "sis-aeb-core";

const submitProps = PropTypes.shape({
    pk: PropTypes.number,
    data: PropTypes.object,
    create: PropTypes.bool
})
export default class ProjectRequests {


    static async deletePerson(submitProps) {
        let response = false
        await Requester({
            method: 'delete',
            url: Host() + 'person/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt'),
            data: submitProps.data
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async submitPerson(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            url: submitProps.create ? Host() + 'person' : Host() + 'person/' + submitProps.pk,
            method: submitProps.create ? 'post' : 'put',
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

}


