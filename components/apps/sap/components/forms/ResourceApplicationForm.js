import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import ResourcePT from "../../locales/ResourcePT";
import Cookies from "universal-cookie/lib";
import NatureExpenseForm from "./NatureExpenseForm";
import {DropDownField, Selector, TextField, useQuery} from "mfc-core";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import submit from "../../utils/requests/submit";
import associativeKeys from "../../keys/associativeKeys";
import getQuery from "../../queries/getQuery";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";


export default function ResourceApplicationForm(props) {

    const lang = ResourcePT

    const natureHook = useQuery(getQuery('nature_of_expense'))
    const initialData = useMemo(() => {
        return {
            ...props.data,
            ...{
                operation_phase: props.operation?.id
            }
        }
    }, [])
        const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: initialData,
    draftUrl: Host().replace('api', 'draft') + 'resource_application',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 5000,
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
                submit({
                    suffix: 'resource_application',
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
                    <Selector
                        hook={natureHook} keys={associativeKeys.natureOfExpense}
                        width={'calc(33.333% - 21.5px)'}
                        required={true}
                        value={data.nature_of_expense}
                        title={'Natureza de despesas'}
                        placeholder={'Natureza de despesas'}
                        handleChange={entity => handleChange({key: 'nature_of_expense', event: entity})}
                        createOption={true}
                    >
                        {handleClose => (
                            <NatureExpenseForm asDefault={true} create={true} handleClose={handleClose}/>
                        )}
                    </Selector>
                    <DropDownField
                        dark={true}
                        placeholder={lang.indirectCosts}
                        label={lang.indirectCosts}
                        handleChange={event => {

                            handleChange({key: 'indirect_cost', event: event})
                        }} value={data.indirect_cost} required={false}
                        width={'calc(33.333% - 21.5px)'} choices={lang.baseOptions}/>

                    <TextField
                        placeholder={lang.value} label={lang.value}
                        handleChange={event => {

                            handleChange({key: 'value', event: event.target.value})
                        }} value={data.value}
                        required={true} type={'number'} maskStart={'R$'} currencyMask={true}
                        width={'calc(33.333% - 21.5px)'}/>
                </FormRow>
            )}
        </Form>
    )

}

ResourceApplicationForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object,
}
