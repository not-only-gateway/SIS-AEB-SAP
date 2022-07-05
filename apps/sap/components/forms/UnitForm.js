import React from "react";
import PropTypes from "prop-types";
import EntitiesPT from "../../locales/EntitiesPT";


import associativeKeys from "../../keys/associativeKeys";
import getQuery from "../../utils/getQuery";

import submit from "../../utils/submit";

import FormTemplate from "../../../../templates/FormTemplate";
import FORM_OPTIONS from "../../../../static/FORM_OPTIONS";
import {Form, FormRow, Selector, TextField, useQuery} from 'mfc-core'

export default function UnitForm(props) {
    const lang = EntitiesPT
    const unitHook = useQuery(getQuery('unit'))

    return (
        <FormTemplate
            keys={associativeKeys.responsible}
            endpoint={'unit'} service={'hr'}
            initialData={props.data}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}
            create={props.create}
            title={props.create ? lang.newUnit : lang.unit}
            returnButton={true}
            options={FORM_OPTIONS({
                asDraft: asDraft,
                asHistory: asHistory,
                setOpen: setOpen,
                create: props.create
            })}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'unit',
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
                        placeholder={'Nome'} label={'Nome'}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'name'
                            })
                        }} value={data.name}
                        required={true}
                        width={'calc(33.333% - 21.5px'}/>
                    <TextField
                        placeholder={lang.acronym} label={lang.acronym}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'acronym'
                            })
                        }} value={data.acronym}
                        required={true}
                        width={'calc(33.333% - 21.5px'}/>
                    <Selector
                        hook={unitHook} keys={associativeKeys.responsible}
                        width={'calc(33.333% - 21.5px'}

                        value={data.responsible}
                        label={'Unidade da AEB superior'}
                        placeholder={'Unidade da AEB superior'}
                        handleChange={entity => handleChange({key: 'responsible', event: entity})}
                        createOption={true}
                    >
                        {handleClose => (
                            <UnitForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                        )}
                    </Selector>
                </FormRow>
            )}
        </Form>
            )}
        </FormTemplate>
    )

}

UnitForm.propTypes = {
    data: PropTypes.object,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object,
}
