import React, {useEffect, useState} from "react";
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
import PropTypes from "prop-types";
import TedRequests from "../../utils/requests/TedRequests";
import TedPT from "../../locales/TedPT";

export default function AddendumForm(props) {
    const lang = TedPT

    useEffect(() => {
        props.handleChange({name: 'ted', value: props.ted.id})
    }, [])
    return (
        <>

            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newAddendum : lang.eAddendum}
                dependencies={[
                    {name: 'number', type: 'string'},
                    {name: 'global_value', type: 'number'},
                    {name: 'start_date', type: 'date'},
                    {name: 'end_date', type: 'date'},
                    {name: 'changes', type: 'string'}
                ]}

                returnButton={true}
                handleSubmit={() =>
                    TedRequests.submitAddendum({
                        pk: props.data.id,
                        data: props.data,

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

                                handleChange({key: 'number', value: event.target.value})

                            }}  value={props.data === null ? null : props.data.number}
                            required={true}
                            width={'calc(50% - 16px)'}/>
                        <TextField
                            type={'number'}
                            placeholder={lang.globalValue} label={lang.globalValue} currencyMask={true}
                            maskStart={'R$'}
                            handleChange={event => {

                                handleChange({key: 'global_value', value: event.target.value})

                            }}  value={props.data === null ? null : props.data.global_value}
                            required={true}
                            width={'calc(50% - 16px)'}/>
                        <TextField
                            variant={'area'}
                            placeholder={lang.changes} label={lang.changes}
                            handleChange={event => {

                                handleChange({key: 'changes', value: event.target.value})

                            }}  value={props.data === null ? null : props.data.changes}
                            required={true}
                            width={'100%'}/>

                        <DateField
                            dark={true}
                            placeholder={lang.startDate} label={lang.startDate}
                            handleChange={event => {
                                handleChange({key: 'start_date', value: event})
                            }}
                            value={
                                props.data === null ? null : props.data.start_date
                            }
                            required={true} width={'calc(50% - 16px)'}/>
                        <DateField
                            dark={true}
                            placeholder={lang.endDate} label={lang.endDate}
                            handleChange={event => {

                                handleChange({key: 'end_date', value: event})
                            }}
                            value={
                                props.data === null ? null : props.data.end_date
                            }
                            required={true} width={'calc(50% - 16px)'}/>
                    </FormRow>
                )}
            </Form>
        </>
    )

}

AddendumForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    ted: PropTypes.object
}
