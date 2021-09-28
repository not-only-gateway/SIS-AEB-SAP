import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import OperationRequests from "../../utils/requests/OperationRequests";
import ResourcePT from "../../locales/ResourcePT";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import NatureExpenseForm from "./NatureExpenseForm";
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


export default function ResourceApplicationForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = ResourcePT

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (props.create)
            props.handleChange({name: 'operation_phase', value: props.operation.id})
    }, [])
    return (
        <>

            <Form
                entity={props.data}
                create={props.create} label={props.create ? lang.newResource : lang.resource}
                dependencies={{
                    fields: [
                        {name: 'nature_of_expense', type: 'object'},
                        {name: 'indirect_cost', type: 'bool'},
                        {name: 'value', type: 'number'}
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    OperationRequests.submitResource({
                        pk: props.data.id,
                        data: props.data,

                        create: props.create
                    }).then(res => {
                        if(props.create && res)
                            props.returnToMain()
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <Selector
                                getEntityKey={entity => {
                                    if (entity !== null && entity !== undefined)
                                        return entity.id
                                    else return -1
                                }} searchFieldName={'search_input'}
                                handleChange={entity => {
                                    props.handleChange({name: 'nature_of_expense', value: entity})
                                }} label={'Vincular natureza de despesa'}
                                setChanged={() => null}
                                selected={props.data === null || !props.data.nature_of_expense ? null : props.data.nature_of_expense}
                                disabled={false}
                                handleCreate={() => setOpen(true)}
                                width={'100%'}
                                fields={[
                                    {name: 'gnd', type: 'string'},
                                    {name: 'nature_of_expense', type: 'string'},
                                    {name: 'description', type: 'string'},
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
                                    setChanged(true)
                                    props.handleChange({name: 'indirect_cost', value: event})
                                }} value={props.data === null ? null : props.data.indirect_cost} required={false}
                                width={'calc(50% - 16px)'} choices={lang.baseOptions}/>

                            <TextField
                                placeholder={lang.value} label={lang.value}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'value', value: event.target.value})
                                }} value={props.data === null ? null : props.data.value}
                                required={true} type={'number'} maskStart={'R$'} currencyMask={true}
                                width={'calc(50% - 16px)'}/>


                        </>
                    )
                }]}/>
        </>
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
