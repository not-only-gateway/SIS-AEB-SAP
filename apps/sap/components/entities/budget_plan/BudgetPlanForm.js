import React, {useEffect, useState} from "react";

import {TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import Form from "../../shared/core/form/Form";
import ProjectRequests from "../../../utils/requests/ProjectRequests";
import ProjectPT from "../../../packages/locales/ProjectPT";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import Selector from "../../shared/core/selector/Selector";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import ActionForm from "../action/ActionForm";

export default function BudgetPlanForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = ProjectPT
    const [data, setData] = useState(null)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (props.data !== undefined)
            setData(props.data)

        if (props.action !== undefined && props.action !== null) {

            handleObjectChange({
                event: ({name: 'action', value: props.action}),
                setData: setData
            })
        }
    }, [])

    const content = (
        <>

            <Form
                entity={data}
                create={props.create} label={props.create ? lang.newBudgetPlan : lang.budgetPlan}
                dependencies={{
                    fields: [
                        {name: 'number', type: 'string'},
                        {name: 'action', type: 'object'},
                        {name: 'detailing', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true} noAutoHeight={!props.asDefault}
                handleSubmit={() =>
                    ProjectRequests.submitBudgetPlan({
                        pk: data.id,
                        data: data,

                        create: props.create
                    }).then(res => {
                        if (props.create && res)
                            props.returnToMain()
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
                                required={true}
                                width={props.action !== undefined && props.action !== null ? '100%' : 'calc(50% - 16px)'}/>
                            {props.action !== undefined && props.action !== null ?
                                null
                                :
                                <Selector
                                    getEntityKey={entity => {
                                        if (entity !== null && entity !== undefined)
                                            return entity.id
                                        else return -1
                                    }} searchFieldName={'search_input'} selected={data === null ? null : data.action}
                                    handleChange={entity => {
                                        setChanged(true)
                                        handleObjectChange({
                                            event: ({name: 'action', value: entity}),
                                            setData: setData
                                        })
                                    }} label={'Víncular ação'}
                                    required={true}
                                    width={'calc(50% - 16px'}
                                    fields={[
                                        {name: 'number', type: 'string'},
                                        {name: 'detailing', type: 'string'}
                                    ]} labels={['Número', 'detalhamento']}
                                    fetchUrl={Host() + 'list/action'}
                                    fetchToken={(new Cookies()).get('jwt')}

                                    createOption={true}
                                    returnToList={!open}
                                    setReturnToList={() => setOpen(false)}
                                >
                                    <ActionForm create={true} returnToMain={() => setOpen(false)}/>
                                </Selector>
                            }


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

BudgetPlanForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object
}
