import React, {useState} from "react";
import {DateField, Form, FormRow, SelectField, TextField} from "mfc-core";
import PropTypes from "prop-types";

import submit from "../../utils/submit";
import FormTemplate from "../../../../addons/FormTemplate";
import {vacancyKeys} from "../../keys/keys";
import formOptions from "../../../../addons/formOptions";


export default function InstrumentForm(props) {
    const [options, setOptions] = useState([])
    return (
        <>
            <FormTemplate
                keys={vacancyKeys}
                endpoint={'vacancy'}
                service={'cgp'}
                initialData={props.data}
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
                        title={props.create ? 'Nova vaga' : 'Vaga'}
                        create={props.create}
                        returnButton={true} handleClose={() => props.handleClose()}
                        handleSubmit={(data, clearState) => {

                            submit({
                                suffix: 'instrument',
                                pk: data.id,
                                data: data,
                                create: true
                            }).then(res => {
                                if (props.create && res.success) {
                                    props.submitVacancy()
                                    props.handleClose()
                                    clearState()
                                }
                            })
                        }
                        }

                        noAutoHeight={!props.asDefault}>
                        {(data, handleChange) => (
                            <>
                                <FormRow>

                                    <SelectField
                                        placeholder={'Ato'}
                                        label={'Ato'}
                                        handleChange={event => {

                                            handleChange({key: 'act', event: event})
                                        }} value={data.act} required={true}
                                        width={'calc(50% - 16px)'}
                                        choices={[
                                            {key: 'Nomeação/Designação', value: 'Nomeação/Designação'},
                                            {key: 'Exoneração/Dispensa', value: 'Exoneração/Dispensa'},
                                        ]}/>

                                    <SelectField
                                        placeholder={'Tipo'}
                                        label={'Tipo'}
                                        handleChange={event => {
                                            switch (event) {
                                                case 'Decreto': {
                                                    setOptions([
                                                        {key: 'DOU', value: 'DOU'}
                                                    ])
                                                    handleChange({key: 'vehicle', event: 'DOU'})
                                                    break
                                                }
                                                case 'Portaria': {

                                                    setOptions([
                                                        {key: 'Boletim Interno (BI)', value: 'Boletim Interno (BI)'},
                                                        {
                                                            key: 'Diário Oficial da União (DOU)',
                                                            value: ' Diário Oficial da União (DOU)'
                                                        }
                                                    ])
                                                    handleChange({key: 'vehicle', event: 'Boletim Interno (BI)'})
                                                    break
                                                }
                                            }

                                            handleChange({key: 'type', event: event})
                                        }} value={data.type} required={true}
                                        width={'calc(50% - 16px)'}
                                        choices={[
                                            {key: 'Decreto', value: 'Decreto'},
                                            {key: 'Portaria', value: 'Portaria'}
                                        ]}/>

                                    <SelectField
                                        placeholder={'Veículo'}
                                        label={'Veículo'}
                                        handleChange={event => {
                                            handleChange({key: 'vehicle', event: event})
                                        }}
                                        value={data.vehicle}
                                        required={true}
                                        disabled={!data.type}
                                        width={'100%'}
                                        choices={options}
                                    />

                                </FormRow>
                                <FormRow>
                                    <TextField
                                        placeholder={'Identificação'}
                                        label={'Identificação'}
                                        handleChange={event => {
                                            handleChange({
                                                event: event.target.value,
                                                key: 'identification'
                                            })

                                        }} value={data.identification}

                                        required={true}
                                        width={'calc(33.333% - 21.5px)'}/>
                                    <DateField
                                        hoursOffset={4}
                                        placeholder={'Data de publicação'}
                                        label={'Data de publicação'}
                                        handleChange={event => {
                                            handleChange({key: 'publication', event: event})
                                        }}
                                        value={data.publication}
                                        required={true}
                                        width={'calc(33.333% - 21.5px)'}/>
                                    <TextField
                                        placeholder={'Link'}
                                        label={'Link'}
                                        handleChange={event => {
                                            handleChange({
                                                event: event.target.value,
                                                key: 'link'
                                            })
                                        }} value={data.link}

                                        required={true}
                                        width={'calc(33.333% - 21.5px)'}/>
                                </FormRow>
                            </>
                        )}
                    </Form>
                )}
            </FormTemplate>
        </>
    )

}

InstrumentForm.propTypes = {
    submitVacancy: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
}
