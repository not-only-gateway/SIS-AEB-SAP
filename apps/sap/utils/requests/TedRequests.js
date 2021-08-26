import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import Requester from "../../components/shared/misc/requester/Requester";

const jwt = (new Cookies()).get('jwt')
const submitProps = PropTypes.shape({
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
})
export default class TedRequests {
    static async fetchTed(pk) {
        let response = null
        await Requester({
            package: submitProps.data,
            method: 'get',
            url: Host() + 'ted/' + pk,

            token: jwt
        }).then(res => {
            response = res.data
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async submitTed(submitProps) {
        let response = submitProps.create ? null : false
        let data = {}
        data = Object.assign(data, submitProps.data)

        data.responsible = data.responsible.id
        data.action = data.action.id
        data.decentralized_unit = data.decentralized_unit.id

        await Requester({
            package: data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'ted' : Host() + 'ted/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            response = submitProps.create ? res.data : true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteAddendum(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url:  Host() + 'addendum/'+submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {

            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }
    static async submitAddendum(submitProps) {
        let response = false

        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'addendum' : Host() + 'addendum/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }


}


