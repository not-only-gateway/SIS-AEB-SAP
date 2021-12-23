import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {request} from "mfc-core";
import Host from "../utils/host";
// import {Dashboard, Visual} from "@f-ui/charts";
// import {Fabric} from '@f-ui/core'

export default function WorkPlanDashboard(props) {
    const [data, setData] = useState()
    const [lastQuery, setLastQuery] = useState()
    useEffect(() => {
        if (props.workPlan) {
            if (localStorage.getItem('wp_dashboard_' + props.workPlan) !== null) {
                setData(JSON.parse(localStorage.getItem('wp_dashboard_' + props.workPlan)))
                setLastQuery(new Date(localStorage.getItem('wp_dashboard_last_query' + props.workPlan)))
            } else
                request({
                    method: 'get',
                    url: Host() + 'dashboard_exec_sap',
                    package: {
                        work_plan_id: props.workPlan
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data) {
                        const date = (new Date())
                        setLastQuery(date)
                        setData(res.data)
                        localStorage.setItem('wp_dashboard_' + props.workPlan, JSON.stringify(res.data))
                        localStorage.setItem('wp_dashboard_last_query' + props.workPlan, date.toLocaleDateString())
                    }
                })
        }
    }, [props.workPlan])


    return (
        null
        // <Fabric theme={'light'}>
        //     {data ?
        //         <Dashboard datasets={[data]}>
        //             <Visual
        //                 title={'Execução Orçamentária e Financeira'}
        //                 page={0}
        //                 values={[{label: 'id', field: 'id'}]}
        //                 axis={{label: 'fase', field: 'fase'}}
        //                 variant={'horizontal-bar'}
        //             />
        //         </Dashboard>
        //         :
        //         null
        //     }
        // </Fabric>
    )
}

WorkPlanDashboard.propTypes = {
    workPlan: PropTypes.number
}