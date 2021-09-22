import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import Requester from "../../requester/Requester";

export default async function Fetch(props) {
    let params = {
        max_id: props.maxID,
        [props.searchFieldName]: props.searchInput,
        quantity: props.fetchSize
    }

    if (props.params !== null && props.params !== undefined)
        params = {...params, ...props.params}

    await Requester({
        method: 'get',
        url: props.fetchUrl,
        headers: {'authorization': props.fetchToken},
        package: params
    }).then(res => {
        props.data.forEach((page, index) => {
            let newPage = [...page]
            res.data.data.forEach(e => {
                if (newPage.length < props.fetchSize)
                    newPage.push(e)
            })
            if (newPage.length !== page.length) {
                let newData = [...props.data]
                newData[index] = newPage
                props.setData(newData)
            }
        })
        let newData
        if (props.maxID === null)
            newData = [res.data.data]
        else
            newData = [...props.data, ...[res.data.data]]

        props.setData(newData)

        if (res.data.delivered_quantity > 0)
            props.setMaxID(res.data.data[res.data.data.length - 1].id)

        if(typeof props.setCurrentPage === 'function')
            props.setCurrentPage(newData.length -1)

        props.setHasMore(res.data.delivered_quantity === res.data.requested_quantity)
    }).catch(error => {
        console.log(error)
        console.log(error.request)
    })
}

fetch.propTypes = {
    setHasMore: PropTypes.func,
    data: PropTypes.array,
    setData: PropTypes.func,
    params: PropTypes.object,
    searchInput: PropTypes.string,
    maxID: PropTypes.number,
    setMaxID: PropTypes.func,
    host: PropTypes.string,
    fetchUrl: PropTypes.string,
    fetchToken: PropTypes.string,
    fetchSize: PropTypes.number,
    setCurrentPage: PropTypes.func,
    searchFieldName: PropTypes.string,
}
