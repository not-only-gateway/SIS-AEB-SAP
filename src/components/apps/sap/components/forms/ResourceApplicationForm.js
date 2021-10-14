import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import OperationRequests from "../../utils/requests/OperationRequests";
import ResourcePT from "../../locales/ResourcePT";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import NatureExpenseForm from "./NatureExpenseForm";
import {DropDownField, FormRow, Selector, TextField} from "sis-aeb-core";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";

export default function ResourceApplicationForm(props) {

    const lang = ResourcePT

    const [open, setOpen] = useState(false)
    const [initialData, setInitialData] = useState(null)
    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })

    useEffect(() => {
        if (props.create)
            setInitialData({
                ...props.data,
                ...{
                    operation_phase: props.operation.id
                }
            })
    }, [])

    return (
        <Form
            hook={formHook}
            initialData={initialData}
            create={props.create} title={props.create ? lang.newResource : lang.resource}
            dependencies={
                [
                    {key: 'nature_of_expense', type: 'object'},
                    {key: 'indirect_cost', type: 'bool'},
                    {key: 'value', type: 'number'}
                ]

            }
            returnButton={true}
            handleSubmit={(data, clearState) =>
                OperationRequests.submitResource({
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

                    <Selector
                        getEntityKey={entity => {
                            if (entity !== null && entity !== undefined)
                                return entity.id
                            else return -1
                        }} searchFieldName={'search_input'}
                        handleChange={entity => {
                            handleChange({key: 'nature_of_expense', event: entity})
                        }} label={'Vincular natureza de despesa'}
                        setChanged={() => null}
                        selected={props.data === null || !data.nature_of_expense ? null : data.nature_of_expense}
                        disabled={false}
                        handleCreate={() => setOpen(true)}
                        width={'100%'}
                        fields={[
                            {key: 'gnd', type: 'string'},
                            {key: 'nature_of_expense', type: 'string'},
                            {key: 'description', type: 'string'},
                        ]} required={true}
                        labels={['gnd', 'natureza de despesa', 'descrição']}
                        fetchUrl={Host() + 'list/nature_of_expense'}
                        createOption={true}
                        fetchToken={(new Cookies()).get('jwt')}

                        returnToList={!open}
                        setReturnToList={() => setOpen(true)}
                    >
                        <NatureExpenseForm create={true} returnToMain={() => setOpen(false)}/>
                    </Selector>
                    <DropDownField
                        dark={true}
                        placeholder={lang.indirectCosts}
                        label={lang.indirectCosts}
                        handleChange={event => {

                            handleChange({key: 'indirect_cost', event: event})
                        }} value={data.indirect_cost} required={false}
                        width={'calc(50% - 16px)'} choices={lang.baseOptions}/>

                    <TextField
                        placeholder={lang.value} label={lang.value}
                        handleChange={event => {

                            handleChange({key: 'value', event: event.target.value})
                        }} value={data.value}
                        required={true} type={'number'} maskStart={'R$'} currencyMask={true}
                        width={'calc(50% - 16px)'}/>
                </FormRow>
            )}
        </Form>
    )

}

ResourceApplicationForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object
}
