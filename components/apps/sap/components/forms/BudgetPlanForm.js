import React, {useEffect, useMemo} from "react";

import Form from "../../../../core/inputs/form/Form";
import PropTypes from "prop-types";
import ProjectPT from "../../locales/ProjectPT";
import {Selector, TextField} from "mfc-core";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import getQuery from "../../utils/getQuery";
import associativeKeys from "../../keys/associativeKeys";
import submit from "../../utils/submit";
import ActionForm from "./ActionForm";
import FormRow from "../../../../core/inputs/form/FormRow";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


export default function BudgetPlanForm(props) {
    const lang = ProjectPT
    const initialData = useMemo(() => {
        if (props.create)
            return {
                ...props.data,
                ...{
                    action: props.action
                }
            }
        else return props.data
    }, [props])
    const actionHook = useQuery(getQuery('action'))

    useEffect(() => {

    }, [])

    return (
        <FormTemplate
            keys={associativeKeys.budgetPlan}
            endpoint={'budget_plan'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    options={formOptions({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
                    create={props.create} title={props.create ? lang.newBudgetPlan : lang.budgetPlan}

                    returnButton={true}
                    handleSubmit={(data, clearState) =>
                        submit({
                            suffix: 'budget_plan',
                            pk: data.id,
                            data: data,

                            create: props.create
                        }).then(res => {
                            if (props.create && res.success) {
                                props.handleClose()
                                clearState()
                            }

                        })}
                    handleClose={() => props.handleClose()}>
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
                                    createOption={true}
                                >
                                    {handleClose => (
                                        <ActionForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                                    )}
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
            )}
        </FormTemplate>
    )

}

BudgetPlanForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object,
}
