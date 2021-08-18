import axios from "axios";
import PropTypes from "prop-types";
import React from "react";

export default async function Fetch(props) {
    let params = {
        max_id: props.maxID,
        [props.searchFieldName]: props.searchInput
    }

    if (props.params !== null && props.params !== undefined)
        params = {...params, ...props.params}

    await axios({
        method: 'get',
        url: props.fetchUrl,
        headers: {'authorization': props.fetchToken},
        params: params
    }).then(res => {
        props.data.forEach((page, index) => {
            let newPage = [...page]
            res.data.forEach(e => {
                if ((props.fetchSize !== undefined && newPage.length < props.fetchSize) || (!props.fetchSize && newPage.length < 15))
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
            newData = [res.data]
        else
            newData = [...props.data, ...[res.data]]

        props.setData(newData)

        if (res.data.length > 0)
            props.setMaxID(res.data[res.data.length - 1].id)

        if(typeof props.setCurrentPage === 'function')
            props.setCurrentPage(newData.length -1)

    }).catch(error => {
        console.log(error)
        console.log(error.request)
    })
}

fetch.propTypes = {
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
