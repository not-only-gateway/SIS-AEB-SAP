import React, {useEffect, useState} from "react";


import PropTypes from "prop-types";

import ProjectRequests from "../../utils/requests/ProjectRequests";
import ProjectPT from "../../locales/ProjectPT";
import handleObjectChange from "../../utils/shared/HandleObjectChange";

import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import ActionForm from "./ActionForm";
import {
    useQuery,
    Tabs,
    List,
    Modal,
    Selector,
    Form, FormRow,
    DateField,
    DropDownField,
    FileField,
    MultiSelectField,
    Navigation,
    Requester,
    TextField,
    ToolTip
} from "sis-aeb-core";
export default function BudgetPlanForm(props) {
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
                initialData={data}
                create={props.create} title={props.create ? lang.newBudgetPlan : lang.budgetPlan}
                dependencies={
                     [
                        {name: 'number', type: 'string'},
                        {name: 'action', type: 'object'},
                        {name: 'detailing', type: 'string'},
                    ]}
                returnButton={true} noAutoHeight={!props.asDefault}
                handleSubmit={() =>
                    ProjectRequests.submitBudgetPlan({
                        pk: data.id,
                        data: data,

                        create: props.create
                    }).then(res => {
                        if (props.create && res)
                            props.returnToMain()

                    })}
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <FormRow>

                            <TextField
                                placeholder={lang.number} label={lang.number}
                                handleChange={event => {

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
                                    handleObjectChange({
                                        event: ({name: 'detailing', value: event.target.value}),
                                        setData: setData
                                    })
                                }} value={data === null ? null : data.detailing}
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
