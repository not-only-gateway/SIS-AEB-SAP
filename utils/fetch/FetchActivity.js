import Host from "../shared/Host";
import PropTypes from 'prop-types'
import axios from "axios";
import Cookies from "universal-cookie/lib";
import publicIp from "public-ip";

export default async function fetchActivityData(props) {
    let ip = await publicIp.v4()
    await axios({
        method: 'get',
        url: Host() + 'activity',
        headers: {'authorization': (new Cookies()).get('jwt')},
        params: {
            start_date: props.startDate !== null  && props.startDate !== undefined? props.startDate.getTime() : null,
            end_date: props.endDate !== null  && props.endDate !== undefined? props.endDate.getTime() : null,
            ip: props.thisMachine ? ip : null,
            method: props.method,
            path: props.path,
            max_id: props.type === 1 ? null : props.maxID
        }
    }).then(res => {
            switch (props.type){
                case 0: {
                    props.setPagesFetched(props.pagesFetched + 1)
                    props.setData([...props.data, ...res.data])
                    if (res.data.length > 0)
                        props.setMaxID(res.data[res.data.length - 1].activity.id)
                    props.setLastFetchedSize(res.data.length)
                    break
                }
                case 1: {
                    props.setPagesFetched(1)
                    props.setData(res.data)
                    if (res.data.length > 0)
                        props.setMaxID(res.data[res.data.length - 1].activity.id)
                    props.setLastFetchedSize(res.data.length)
                    break
                }
                default:
                    break
            }
    }).catch(error => {
        console.log(error)
    })
}

fetchActivityData.propTypes={
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
    path: PropTypes.any,
    setPagesFetched: PropTypes.func,
    pagesFetched: PropTypes.number,
    endDate: PropTypes.string
}