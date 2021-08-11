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
    if (props.maxID === null)
      props.setData(res.data)
    else
      props.setData([...props.data, ...res.data])

    if (res.data.length > 0)
      props.setMaxID(res.data[res.data.length - 1].id)
    props.setLastFetchedSize(res.data.length)
  }).catch(error => {
    console.log(error)
  })
}

fetch.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
  params: PropTypes.object,
  setLastFetchedSize: PropTypes.func,
  searchInput: PropTypes.string,
  maxID: PropTypes.number,
  setMaxID: PropTypes.func,
  host: PropTypes.string,
  fetchUrl: PropTypes.string,
  fetchToken: PropTypes.string,
  searchFieldName: PropTypes.string,
}