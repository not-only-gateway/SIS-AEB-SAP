import React, {useEffect, useState} from "react";

import {DropDownField, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import Form from "../../shared/core/form/Form";
import ProjectRequests from "../../../utils/requests/ProjectRequests";
import ProjectPT from "../../../packages/locales/ProjectPT";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";

export default function NatureExpenseForm(props) {
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
                create={props.create} label={props.create ? lang.newNatureOfExpense : lang.natureOfExpense}
                dependencies={{
                    fields: [
                        {name: 'description', type: 'string'},
                        {name: 'nature_of_expense', type: 'string'},
                        {name: 'gnd', type: 'number'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    ProjectRequests.submitNatureOfExpense({
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
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({
                                        event: ({name: 'description', value: event.target.value}),
                                        setData: setData
                                    })

                                }} value={data === null ? null : data.description}
                                required={true} width={'100%'} variant={'area'}/>

                            <DropDownField
                                placeholder={'gnd'}
                                label={'gnd'}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({
                                        event: ({name: 'gnd', value: event}),
                                        setData: setData
                                    })
                                }} value={data === null ? null : data.gnd} required={false}
                                width={'calc(50% - 16px)'} choices={[{key: 3, value: 3}, {key: 4, value: 4}]}/>
                            <TextField
                                placeholder={lang.natureOfExpense} label={lang.natureOfExpense}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({
                                        event: ({name: 'nature_of_expense', value: event.target.value}),
                                        setData: setData
                                    })
                                }} value={data === null ? null : data.nature_of_expense}
                                required={true} width={'calc(50% - 16px)'}
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

NatureExpenseForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool
}
