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

export default function NatureExpenseForm(props) {
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
        props.asDefault ? content :
            <div style={{width: '55vw', height: '400px', background: 'white', borderRadius: '8px'}}>
                {content}
            </div>
    )

}

NatureExpenseForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool
}
