import React, {useEffect, useState} from "react";

import Form from "../../../../core/inputs/form/Form";
import PropTypes from "prop-types";
import ProjectPT from "../../locales/ProjectPT";
import Cookies from "universal-cookie/lib";
import {FormRow, Selector, TextField} from "mfc-core";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import useQuery from "../../../../core/shared/hooks/useQuery";
import getQuery from "../../queries/getQuery";
import associativeKeys from "../../keys/associativeKeys";
import submit from "../../utils/requests/submit";
import ActionForm from "./ActionForm";
import Host from "../../utils/shared/Host";

export default function BudgetPlanForm(props) {
    const lang = ProjectPT
    const [initialData, setInitialData] = useState(null)

    const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: Host().replace('api', 'draft') + 'action',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000,
        parsePackage: pack => {
            return {
                ...pack,
                identifier: draftID
            }
        },
        draftMethod: draftID ? 'put' : 'post',
        onSuccess: (res) => {
            setDraftID(res.data.id)
        }
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
                    {key: 'number', type: 'string'},
                    {key: 'action', type: 'object'},
                    {key: 'detailing', type: 'string'},
                ]}
            returnButton={true} noAutoHeight={!props.asDefault}
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
    )

}

BudgetPlanForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object,
    draftID: PropTypes.number,
}