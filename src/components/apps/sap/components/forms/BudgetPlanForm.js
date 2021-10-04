import React, {useEffect, useState} from "react";


import PropTypes from "prop-types";

import ProjectRequests from "../../utils/requests/ProjectRequests";
import ProjectPT from "../../locales/ProjectPT";

import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import ActionForm from "./ActionForm";
import {Form, FormRow, Selector, TextField} from "sis-aeb-core";

export default function BudgetPlanForm(props) {
    const lang = ProjectPT
    const [initialData, setInitialData] = useState(null)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (props.data !== undefined)
            setInitialData(props.data)

        if (props.action !== undefined && props.action !== null) {
            setInitialData({
                ...props.data,
                ...{
                    action: props.action
                }
            })
        }
    }, [])

    const content = (
        <>

            <Form
                initialData={initialData}
                create={props.create} title={props.create ? lang.newBudgetPlan : lang.budgetPlan}
                dependencies={
                    [
                        {name: 'number', type: 'string'},
                        {name: 'action', type: 'object'},
                        {name: 'detailing', type: 'string'},
                    ]}
                returnButton={true} noAutoHeight={!props.asDefault}
                handleSubmit={(data, clearState) =>
                    ProjectRequests.submitBudgetPlan({
                        pk: data.id,
                        data: data,

                        create: props.create
                    }).then(res => {
                        if (props.create && res){
                            props.returnToMain()
                            clearState()
                        }

                    })}
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <FormRow>

                        <TextField
                            placeholder={lang.number} label={lang.number}
                            handleChange={event => {
                                handleChange({event: event.target.value, key: 'number'})
                            }}
                            value={data.number}
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
                                }} searchFieldName={'search_input'} selected={data.action}
                                handleChange={entity => {
                                    handleChange({
                                        event: event.target.value,
                                        key: 'action'
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
                                handleChange({event: event.target.value, key: 'detailing'})
                            }}
                            value={data.detailing}
                            required={true} width={'100%'} variant={'area'}
                        />

                    </FormRow>
                )}
            </Form>
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
