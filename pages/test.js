import React, {useEffect, useMemo, useState} from "react";
import TextField from "../components/core/inputs/text/TextField";

const randomSet = (quantity) => {
    let res = []
    for (let i = 0; i < quantity; i++) {
        res.push({axis: 'A' + i, value: Math.floor(Math.random() * (101))})
    }

    return res
}
export default function test() {
    const [content, setContent] = useState('')

    return (
        <div style={{
            padding: '64px',
            boxSizing: 'border-box', width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden',
            display: 'flex', flexFlow: 'row wrap', gap: '16px',

        }}>
            <TextField required={true} helperText={'TESTE'} handleChange={e => setContent(e.target.value)} value={content} label={'TESTE'} placeholder={'TESTE'} type={'number'}/>
        </div>
    )
}