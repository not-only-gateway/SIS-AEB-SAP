import React, {useState} from "react";
import {Button, useQuery} from "mfc-core";
import getQuery from "../components/apps/sap/utils/getQuery";
import Alert from "../components/core/feedback/alert/Alert";
import HorizontalChart from "../components/core/visualization/charts/horizontal/HorizontalChart";
import PieChart from "../components/core/visualization/charts/pie/PieChart";
import VerticalChart from "../components/core/visualization/charts/vertical/VerticalChart";
import LineChart from "../components/core/visualization/charts/line/LineChart";
import TextField from "../components/core/inputs/text/TextField";
import Selector from "../components/core/inputs/selector/Selector";
import MultiSelectField from "../components/core/inputs/multiselect/MultiSelectField";
import DateField from "../components/core/inputs/date/DateField";
import DropDownField from "../components/core/inputs/dropdown/DropDownField";
import FileField from "../components/core/inputs/file/FileField";

export default function test() {
    const randomSet = (quantity) => {
        let res = []
        for (let i = 0; i < quantity; i++) {
            res.push({s: 'C' + i, q: Math.floor(Math.random() * (101))})
        }

        return res
    }

    const actionHook = useQuery(getQuery('action'))

    return (
        <div style={{
            padding: '64px',
            boxSizing: 'border-box', width: '100%', height: '100%', overflow: 'auto',
            display: 'flex', flexFlow: 'row wrap', gap: '16px'
        }}>

            <TextField handleChange={() => null}/>
            <TextField handleChange={() => null} variant={'area'}/>
            <Selector hook={actionHook} keys={[]}/>
            <MultiSelectField choices={[]} handleChange={() => null}/>
            <DateField handleChange={() => null}/>
            <DropDownField choices={[]} handleChange={() => null}/>
            <FileField/>

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