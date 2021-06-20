import axios from "axios";
import PropTypes from "prop-types";
import React from "react";

export default async function Fetch(props) {
    await axios({
        method: 'get',
        url: props.fetchUrl,
        headers: {'authorization': props.fetchToken},
        params: {
            max_id: props.maxID,
            searchInput: props.searchInput && props.searchInput.length > 0 ? props.searchInput : null
        }
    }).then(res => {

        if (props.maxID === null)
            props.setData(res.data)
        else
            props.setData([...props.data, ...res.data])

        if (res.data.length > 0)
            props.setMaxID(res.data[res.data.length - 1].id)

    }).catch(error => {
        console.log(error)
    })
}

fetch.propTypes = {
    data: PropTypes.array,
    setData: PropTypes.func,

    searchInput: PropTypes.string,
    maxID: PropTypes.number,
    setMaxID: PropTypes.func,

    host: PropTypes.string,
    fetchUrl: PropTypes.string,
    fetchToken: PropTypes.string
}