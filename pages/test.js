import React, {useState} from "react";
import {Button, useQuery} from "mfc-core";
import getQuery from "../components/apps/sap/queries/getQuery";
import Alert from "../components/core/feedback/alert/Alert";
import HorizontalChart from "../components/core/visualization/charts/horizontal/HorizontalChart";
import PieChart from "../components/core/visualization/charts/pie/PieChart";
import VerticalChart from "../components/core/visualization/charts/vertical/VerticalChart";
import LineChart from "../components/core/visualization/charts/line/LineChart";

export default function test() {
    const randomSet = (quantity) => {
        let res = []
        for (let i = 0; i < quantity; i++) {
            res.push({s: 'C' + i, q: Math.floor(Math.random() * (101))})
        }

        return res
    }
    return (
        <div style={{
            padding: '64px',
            boxSizing: 'border-box', width: '100%', height: '100%', overflow: 'auto',
            display: 'flex', flexFlow: 'row wrap', gap: '16px'
        }}>


            <HorizontalChart
                title={'Titulo do gráfico'}
                height={500}
                width={500}
                color={'#0095ff'}
                axis={{label: 'Si', field: 's'}}
                data={randomSet(12)}
                value={{label: 'Quantity', field: 'q'}}/>

            <PieChart
                title={'Titulo do gráfico'}
                height={500}
                width={500}
                color={'#0095ff'}
                axis={{label: 'Si', field: 's'}}
                data={randomSet(12)}
                value={{label: 'Quantity', field: 'q'}}/>
            <VerticalChart
                title={'Titulo do gráfico'}
                height={500}
                width={500}
                color={'#0095ff'}
                axis={{label: 'Si', field: 's'}}
                data={randomSet(20)}
                value={{label: 'Quantity', field: 'q'}}/>
            <LineChart
                title={'Titulo do gráfico'}
                height={500}
                width={500}
                color={'#0095ff'}
                axis={{label: 'Si', field: 's'}}
                data={randomSet(12)}
                value={{label: 'Quantity', field: 'q'}}/>
        </div>
    )
}