import PropTypes from "prop-types";
import {Alert, Selector} from "sis-aeb-misc";
// import {DateField, FormLayout, TextField} from "sis-aeb-inputs";
import React, {useState} from "react";
import ContractPT from "../../packages/locales/organizational/ContractPT";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import FormLayout from "../shared/components/FormLayout";
import TextField from "../shared/components/TextField";
import DateField from "../shared/components/DateField";


export default function ContractForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = ContractPT
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })

    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />

            <FormLayout
                create={props.create}
                formLabel={lang.title}
                dependencies={{
                    fields: [
                        {name: 'year_number', type: 'string'},
                        {name: 'entity', type: 'object'},
                        {name: 'object', type: 'string'},
                        {name: 'beginning_validity', type: 'number'},
                        {name: 'end_validity', type: 'number'},
                        {name: 'value', type: 'number'},
                        {name: 'sei', type: 'string'},
                        {name: 'process', type: 'string'},
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true} handleSubmit={() =>
                props.handleSubmit({
                    pk: props.data === null ? null : props.data.id,
                    data: props.data,
                    create: props.data === null || props.data.id === undefined,
                    setStatus: setStatus
                }).then(res => {
                    setChanged(!res)
                })}
                handleClose={() => props.closeModal()}
                forms={[{
                    title: lang.document,
                    child: (
                        <>
                            <TextField

                                placeholder={lang.process} label={lang.process}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'process', value: event.target.value})
                                }}
                                locale={props.locale} value={props.data === null ? null : props.data.process}
                                required={true}
                                width={'calc(50% - 16px)'}
                            />

                            <TextField

                                placeholder={'SEI'} label={'SEI'}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'sei', value: event.target.value})
                                }}
                                locale={props.locale} value={props.data === null ? null : props.data.sei}
                                required={true}
                                width={'calc(50% - 16px)'}
                            />
                            <TextField

                                placeholder={lang.object} label={lang.object}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'object', value: event.target.value})
                                }}
                                locale={props.locale} value={props.data === null ? null : props.data.object}
                                required={true}
                                width={'calc(50% - 16px)'}
                            />
                            <TextField

                                placeholder={lang.year} label={lang.year}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'year_number', value: event.target.value})
                                }}
                                locale={props.locale} value={props.data === null ? null : props.data.year_number}
                                required={true}
                                width={'calc(50% - 16px)'}
                            />

                        </>
                    )
                },
                    {
                        title: lang.additional,
                        child: (
                            <>
                                <TextField
                                    type={'number'}
                                    placeholder={lang.value} label={lang.value}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'value', value: event.target.value})
                                    }}
                                    locale={props.locale} value={props.data === null ? null : props.data.value}
                                    required={true}
                                    width={'calc(50% - 16px)'}
                                />
                                <Selector
                                    handleChange={entity => {
                                        setChanged(true)
                                        props.handleChange({name: 'entity', value: entity})
                                    }}
                                    selected={props.data === null ? null : props.data.entity}
                                    setChanged={setChanged} required={true} label={lang.entity}
                                    disabled={false} width={'calc(50% - 16px)'}
                                    renderEntity={entity => {
                                        if (entity !== undefined && entity !== null)
                                            return (
                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                    {entity.acronym}
                                                </div>
                                            )
                                        else
                                            return null
                                    }} fetchUrl={Host() + 'list/entity'} fetchToken={(new Cookies()).get('jwt')}
                                    elementRootID={'root'}/>
                                <DateField

                                    placeholder={lang.startValidity} label={lang.startValidity}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({
                                            name: 'beginning_validity',
                                            value:
                                                event.target.value
                                        })
                                    }} locale={props.locale}
                                    value={
                                        props.data !== null && typeof (props.data.beginning_validity) === 'number' ?
                                            new Date(props.data.beginning_validity).toLocaleDateString().replaceAll('/', '-'
                                            ).replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
                                            :
                                            props.data === null ? null : props.data.beginning_validity
                                    }
                                    required={true} width={'calc(50% - 16px)'}/>
                                <DateField

                                    placeholder={lang.endValidity} label={lang.endValidity}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({
                                            name: 'end_validity',
                                            value: event.target.value
                                        })
                                    }} locale={props.locale}
                                    value={
                                        props.data !== null && typeof (props.data.end_validity) === 'number' ?
                                            new Date(props.data.end_validity).toLocaleDateString().replaceAll('/', '-'
                                            ).replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
                                            :
                                            props.data === null ? null : props.data.end_validity
                                    }
                                    required={true} width={'calc(50% - 16px)'}/>
                            </>
                        )
                    },
                ]}/>
        </>
    )
}
ContractForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    data: PropTypes.object,
    closeModal: PropTypes.func
}