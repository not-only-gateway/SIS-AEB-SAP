import React, {useEffect, useMemo, useState} from "react";
import Chart from "../components/core/visualization/charts/Chart";

const randomSet = (quantity) => {
    let res = []
    for (let i = 0; i < quantity; i++) {
        res.push({axis: 'A' + i, value: Math.floor(Math.random() * (101))})
    }

    return res
}
export default function test() {
    const [content, setContent] = useState('')
    const data = useMemo(() => {
        return randomSet(15)
    }, [])

    return (
        <div style={{
            padding: '64px',
            boxSizing: 'border-box', width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden',
            display: 'flex', flexFlow: 'row wrap', gap: '16px',

        }}>
            <Chart
                title={'Title here'}
                color={'#0095ff'}
                type={'line-chart'}
                axis={{label: 'Axis', field: 'axis'}}
                data={data}
                value={{label: 'Value', field: 'value'}}
            />
        </div>
    )
}