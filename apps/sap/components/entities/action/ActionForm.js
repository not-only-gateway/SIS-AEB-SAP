import React, {useEffect, useState} from "react";

import {DateField, DropDownField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import OperationRequests from "../../../utils/fetch/OperationRequests";
import EntityLayout from "../../shared/misc/form/EntityLayout";
import PermanentGoodsPT from "../../../packages/locales/PermanentGoodsPT";
import Alert from "../../shared/misc/alert/Alert";
import ProjectRequests from "../../../utils/fetch/ProjectRequests";
import ProjectPT from "../../../packages/locales/ProjectPT";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import Selector from "../../shared/misc/selector/Selector";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";

export default function ActionForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = ProjectPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    const [data, setData] = useState(null)
    useEffect(() => {
        if(!props.create)
            setData(props.data)
    }, [])

    const content = (
        <>
            <Alert
                type={status.type} render={status.type !== undefined}
                handleClose={() => setStatus({type: undefined, message: undefined})}
                message={status.message}
            />
            <EntityLayout
                entity={data}
                create={props.create} label={props.create ? lang.newAction : lang.action}
                dependencies={{
                    fields: [
                        {name: 'number', type: 'string'},
                        {name: 'detailing', type: 'object'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    ProjectRequests.submitAction({
                        pk: data.id,
                        data: data,
                        setStatus: setStatus,
                        create: props.create
                    }).then(res => {
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField
                                placeholder={lang.number} label={lang.number}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({
                                        event: ({name: 'number', value: event.target.value}),
                                        setData: setData
                                    })

                                }} value={data === null ? null : data.number}
                                required={true} width={'100%'}/>
                            <TextField
                                placeholder={lang.detailing} label={lang.detailing}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({
                                        event: ({name: 'detailing', value: event.target.value}),
                                        setData: setData
                                    })
                                }} value={data === null ? null : data.detailing}
                                required={true} width={'100%'} variant={'area'}
                            />
                        </>
                    )
                }]}/>
        </>
    )

    return (
        props.asDefault ? content :
            <div style={{width: '55vw', height: '400px', background: 'white', borderRadius: '8px'}}>
                {content}
            </div>
    )

}

ActionForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool
}
