import PropTypes from 'prop-types'
import Requester from "../../../../requester/Requester";

export default async function fetch(props) {
    let params = {
        max_id: props.maxID,
        quantity: props.quantity
    }

    await Requester({
        method: 'get',
        url: props.url,
        headers: props.headers,
        package: params
    }).then(res => {
        if (props.maxID === null) {
            props.dispatchData({type: props.actions.EMPTY})
            props.dispatchData({type: props.actions.PUSH, payload: res.data})
        } else
            props.dispatchData({type: props.actions.PUSH, payload: res.data})

        props.setHasMore(res.data.length === props.quantity)
    }).catch(e => null)
}

fetch.propTypes = {
    data: PropTypes.array,
    dispatchData: PropTypes.func,
    actions: PropTypes.object,

    setHasMore: PropTypes.func,
    maxID: PropTypes.any,
    quantity: PropTypes.number,
    headers: PropTypes.object,
    url: PropTypes.string
}