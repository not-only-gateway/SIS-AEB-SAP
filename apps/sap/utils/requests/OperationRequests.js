import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import Requester from "../../components/shared/core/requester/Requester";

const submitProps = PropTypes.shape({
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
})
export default class OperationRequests {

    static async submitOperation(submitProps) {
        let response = submitProps.create ? null : false
        let data = {}
        data = Object.assign(data, submitProps.data)
        console.log(data)
        if (typeof data.activity_stage === 'object')
            data.activity_stage = data.activity_stage.id


        await Requester({
            package: data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'operation_phase' : Host() + 'operation_phase/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = submitProps.create ? res.data : true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async submitPermanentGoods(submitProps) {
        let response = false
        let data = {}
        data = Object.assign(data, submitProps.data)
        data.total_value = data.unit_price * data.quantity

        await Requester({
            package: data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'permanent_goods' : Host() + 'permanent_goods/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }


    static async submitResource(submitProps) {
        let response = false
        let data = {}
        data = Object.assign(data, submitProps.data)

        data.nature_of_expense = data.nature_of_expense.id

        await Requester({
            package: data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'resource_application' : Host() + 'resource_application/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async submitNote(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'note' : Host() + 'note/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })


        return response
    }

    static async submitActionItem(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'action_item' : Host() + 'action_item/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async submitFollowUpGoal(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'follow_up_goal' : Host() + 'follow_up_goal/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteResource(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'resource_application/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })


        return response
    }

    static async deletePermanentGoods(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'permanent_goods/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async deleteOperation(submitProps) {
        let response = false

        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'operation_phase/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async deleteActionItem(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'action_item/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteFollowUpGoal(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'follow_up_goal/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async submitExecution(submitProps) {
        let response = false
        let data = {}
        data = Object.assign(data, submitProps.data)
        const date = new Date(data.execution_date)

        data.execution_date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        data.operation_phase = data.operation_phase.id

        await Requester({
            package: data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'execution' : Host() + 'execution/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteExecution(submitProps) {
        let response = false

        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'execution/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async deleteNote(submitProps) {
        let response = false


        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'note/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }
}


