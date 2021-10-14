import React, {useEffect, useState} from "react";

import Form from "../../../../core/inputs/form/Form";
import PropTypes from "prop-types";

import ProjectRequests from "../../utils/requests/ProjectRequests";
import ProjectPT from "../../locales/ProjectPT";

import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import ActionForm from "./ActionForm";
import {FormRow, Selector, TextField} from "sis-aeb-core";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import useQuery from "../../../../core/shared/hooks/useQuery";
import getQuery from "../../queries/getQuery";
import associativeKeys from "../../keys/associativeKeys";

export default function BudgetPlanForm(props) {
    const lang = ProjectPT
    const [initialData, setInitialData] = useState(null)
    const [open, setOpen] = useState(false)
    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })
    const actionHook = useQuery(getQuery('action'))

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

    return (

        <Form
            hook={formHook}
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
                    if (props.create && res) {
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
                            hook={actionHook}
                            placeholder={'Ação'}
                            title={'Ação'}
                            handleChange={e => handleChange({event: e, key: 'action'})}
                            value={data.action} width={'calc(50% - 16px)'} required={true}
                            keys={associativeKeys.action}
                        />
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
    )

}

BudgetPlanForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object
}
