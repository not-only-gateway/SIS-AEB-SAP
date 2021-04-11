import makeRequest from "../shared/Request";
import localIpUrl from "local-ip-url";
import Host from "../shared/Host";
import PropTypes from 'prop-types'

export default async function fetchActivityData(props) {
    await makeRequest({
        package: {
            start_date: props.startDate !== null ? props.startDate.getTime() : null,
            ip: props.thisMachine ? localIpUrl('public') : null,
            method: props.method,
            path: props.path,
            max_id: props.type === 1 ? null : props.maxID
        },
        method: 'get',
        url: 'activity',
        host: Host()
    }).then(response => {

        if (response.error) {
            props.setError(true)
            props.setErrorMessage(response.errorMessage)
        } else {
            switch (props.type){
                case 0: {
                    props.setData([...props.data, ...response.data])
                    if (response.data.length > 0)
                        props.setMaxID(response.data[response.data.length - 1].id)
                    props.setLastFetchedSize(response.data.length)
                    break
                }
                default: {

                    props.setData(response.data)
                    if (response.data.length > 0)
                        props.setMaxID(response.data[response.data.length - 1].id)
                    props.setLastFetchedSize(response.data.length)
                    break
                }
            }

        }
    })
}

fetchData.propTypes={
    type: PropTypes.number,
    setLastFetchedSize: PropTypes.func,
    setData: PropTypes.func,
    data: PropTypes.array,
    setMaxID: PropTypes.func,
    maxID: PropTypes.any,
    setError: PropTypes.func,
    setErrorMessage: PropTypes.func,
    thisMachine: PropTypes.bool,
    startDate: PropTypes.string,
    method: PropTypes.any,
    path: PropTypes.any
}