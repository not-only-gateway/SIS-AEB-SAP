import React, {useEffect, useState} from "react";

import {TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import Form from "../../shared/core/form/Form";
import ProjectRequests from "../../../utils/requests/ProjectRequests";
import ProjectPT from "../../../packages/locales/ProjectPT";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";

export default function ActionForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = ProjectPT
    const [data, setData] = useState(null)
    useEffect(() => {
        if (props.data !== undefined)
            setData(props.data)
    }, [])

    const content = (
        <>
            <Form
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
                        create: props.create
                    }).then(res => {
                        if (props.create && res)
                            props.returnToMain()
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()} noAutoHeight={!props.asDefault}
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
        content
    )

}

ActionForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool
}
