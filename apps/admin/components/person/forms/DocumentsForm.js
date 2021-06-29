import React, {useState} from "react";
import PropTypes from "prop-types";
import {Alert} from "sis-aeb-misc";
import {DateField, FormLayout, TextField} from "sis-aeb-inputs";
import DocumentsFormPT from "../../../packages/locales/person/DocumentsFormPT";
import submitDocuments from "../../../utils/submit/SubmitDocuments";


export default function DocumentsForm(props) {

    const lang = DocumentsFormPT
    const [changed, setChanged] = useState(false)
    const [status, setStatus] = useState({
        error: undefined,
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
                        {name: 'cpf', type: 'string'},
                        {name: 'dispatch_date', type: 'number'},
                        {name: 'rg', type: 'string'},
                        {name: 'issuing_body', type: 'string'},
                        {name: 'voter_registration', type: 'string'},
                        {name: 'electoral_zone', type: 'string'},
                        {name: 'work_card', type: 'string'},
                        {name: 'electoral_section', type: 'string'},
                        {name: 'pis', type: 'string'},
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true} handleSubmit={() =>
                submitDocuments({
                    pk: props.id,
                    data: props.data,
                    setStatus: setStatus
                }).then(res => {
                    setChanged(!res)
                })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    title: lang.registration,
                    child: (
                        <>
                            <TextField

                                dark={true}
                                placeholder={'CPF'}
                                label={'CPF'}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'cpf', value: event.target.value})
                                }}
                                locale={props.locale}
                                value={props.data === null ? null : props.data.cpf}
                                required={true}
                                maxLength={11}
                                width={'calc(50% - 16px)'}
                            />

                            <TextField
                                dark={true}
                                placeholder={'RG'}
                                label={'RG'}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'rg', value: event.target.value})
                                }}
                                locale={props.locale}
                                value={props.data === null ? null : props.data.rg}
                                required={true}
                                maxLength={8}
                                width={'calc(50% - 16px)'}
                            />

                            <TextField
                                dark={true}
                                placeholder={lang.issuing}
                                label={lang.issuing}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'issuing_body', value: event.target.value})
                                }}
                                locale={props.locale}
                                value={props.data === null ? null : props.data.issuing_body}
                                required={true}
                                maxLength={8}
                                width={'calc(50% - 16px)'}
                            />


                            <DateField
                                dark={true}
                                placeholder={lang.dispatch}
                                label={lang.dispatch}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'dispatch_date', value: event.target.value})
                                }}
                                locale={props.locale}
                                value={props.data === null ? null :
                                    typeof (props.data.dispatch_date) === 'number' ?
                                        new Date(props.data.dispatch_date).toLocaleDateString().replaceAll('/', '-'
                                        ).replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
                                        :
                                        props.data.dispatch_date
                                }
                                required={true}

                                width={'calc(50% - 16px)'}
                            />
                        </>
                    )
                },
                    {
                        title: lang.work,
                        child: (
                            <>
                                <TextField
                                    dark={true}
                                    placeholder={lang.work}
                                    label={lang.work}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'work_card', value: event.target.value})
                                    }}
                                    locale={props.locale}
                                    value={props.data === null ? null : props.data.work_card}
                                    required={true}

                                    width={'calc(50% - 16px)'}
                                />
                                <TextField
                                    dark={true}
                                    placeholder={'PIS/PASEP'}
                                    label={'PIS/PASEP'}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'pis', value: event.target.value})
                                    }}
                                    locale={props.locale}
                                    value={props.data === null ? null : props.data.pis}
                                    required={true}

                                    width={'calc(50% - 16px)'}
                                />
                            </>
                        )
                    },
                    {
                        title: lang.bank,
                        child: (
                            <>
                                <TextField
                                    dark={true}
                                    placeholder={lang.bank}
                                    label={lang.bank}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'bank', value: event.target.value})
                                    }}
                                    locale={props.locale}
                                    value={props.data === null ? null : props.data.bank}
                                    required={false}
                                    width={'calc(50% - 16px)'}
                                />
                                <TextField
                                    dark={true}
                                    placeholder={lang.agency}
                                    label={lang.agency}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'agency', value: event.target.value})
                                    }}
                                    locale={props.locale}
                                    value={props.data === null ? null : props.data.agency}
                                    required={false}
                                    width={'calc(50% - 16px)'}
                                />
                            </>
                        )
                    },
                    {
                        title: lang.voter,
                        child: (
                            <>
                                <TextField
                                    dark={true}
                                    placeholder={lang.voter}
                                    label={lang.voter}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'voter_registration', value: event.target.value})
                                    }}
                                    locale={props.locale}
                                    value={props.data === null ? null : props.data.voter_registration}
                                    required={false}
                                    width={'100%'}
                                />
                                <TextField
                                    dark={true}
                                    placeholder={lang.section}
                                    label={lang.section}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'electoral_section', value: event.target.value})
                                    }}
                                    locale={props.locale}
                                    value={props.data === null ? null : props.data.electoral_section}
                                    required={false}
                                    width={'calc(50% - 16px)'}
                                />
                                <TextField
                                    dark={true}
                                    placeholder={lang.zone}
                                    label={lang.zone}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'electoral_zone', value: event.target.value})
                                    }}
                                    locale={props.locale}
                                    value={props.data === null ? null : props.data.electoral_zone}
                                    required={false}
                                    width={'calc(50% - 16px)'}
                                />
                            </>
                        )
                    },
                ]}/>
        </>
    )

}
DocumentsForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    editable: PropTypes.bool,

    setAccepted: PropTypes.func,
    create: PropTypes.bool,
    returnToMain: PropTypes.func,
}