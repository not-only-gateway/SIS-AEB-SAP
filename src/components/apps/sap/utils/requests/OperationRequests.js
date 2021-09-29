import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import {Requester} from "sis-aeb-core";

const submitProps = PropTypes.shape({
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
})
export default class OperationRequests {

    static async deleteFile(submitProps) {
        let response = false
        await Requester({
            method: 'delete',
            url: Host(true) + 'file/' + submitProps.id,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            console.log(res)
            response = true
        }).catch(e => console.log(e))
        return response
    }

    static async fetchFile(submitProps) {
        let response = null
        await Requester({
            method: 'get',
            url: Host(true) + 'file/' + submitProps.id,
            showSuccessAlert: false,
            token: (new Cookies()).get('jwt')
        }).then(async res => {
            await Requester({
                method: 'get',
                url: Host(true) + 'file_name/' + submitProps.id,
                showSuccessAlert: false,
                token: (new Cookies()).get('jwt')
            }).then(r => {
                response = {
                    data: res.data,
                    fileName: r.data.data
                }
            })
        }).catch(e => console.log(e))
        return response
    }

    static async submitOperation(submitProps) {
        let response = submitProps.create ? null : false
        let data = {}
        data = Object.assign(data, submitProps.data)
        console.log(data)
        if (typeof data.activity_stage === 'object')
            data.activity_stage = data.activity_stage.id
        data.stage_representation = parseInt(data.stage_representation)

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
        const submitData = async (fileID) => {
            let data = {}
            data = Object.assign(data, submitProps.data)
            data.file = fileID
            await Requester({
                package: data,
                method: submitProps.create ? 'post' : 'put',
                url: submitProps.create ? Host() + 'follow_up_goal' : Host() + 'follow_up_goal/' + submitProps.pk,
                showSuccessAlert: true,
                token: (new Cookies()).get('jwt')
            }).then(res => {
                response = true
            }).catch(e => {
                console.log(e)
            })
        }
        if (submitProps.file !== undefined && submitProps.file !== null) {
            let data = new FormData()
            data.append('file', submitProps.file)
            await Requester({
                package: data,
                headers: {"Content-Type": "multipart/form-data"},
                method: 'post',
                url: Host(true) + 'file',
                showSuccessAlert: false,
                token: (new Cookies()).get('jwt')
            }).then(async res => {
                console.log(res)
                await submitData(res.data.data)
            }).catch(async e => {
                console.log(e)
                await submitData(null)
            })

        } else
            await submitData(null)
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
        console.log(data)
        const date = data.execution_date.split('-')

        data.execution_date = date[1] + '-' + date[2] + '-' + date[0]
        console.log(data.execution_date)
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


