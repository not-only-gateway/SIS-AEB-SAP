import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import TextField from "../../modules/inputs/TextField";
import Alert from "../../layout/Alert";
import HorizontalTabs from "../../layout/navigation/HorizontalTabs";
import TabContent from "../TabContent";
import shared from "../../../styles/shared/Shared.module.css";
import Button from "../../modules/inputs/Button";
import DateField from "../../modules/inputs/DateField";


export default function DocumentsForm(props) {
    const [openTab, setOpenTab] = useState(0)
    const [lang, setLang] = useState(null)
    const [changed, setChanged] = useState(false)

    function disabled() {
        return (
            props.documents === null ||
            props.documents.cpf === null ||
            props.documents.dispatch_date === null ||
            props.documents.rg === null ||
            props.documents.issuing_body === null ||
            props.documents.voter_registration === null ||
            props.documents.electoral_zone === null ||
            props.documents.work_card === null ||
            props.documents.electoral_section === null ||
            props.documents.pis === null ||

            !props.documents.cpf ||
            !props.documents.dispatch_date ||
            !props.documents.rg ||
            !props.documents.issuing_body ||
            !props.documents.voter_registration ||
            !props.documents.electoral_zone ||
            !props.documents.work_card ||
            !props.documents.electoral_section ||
            !props.documents.pis ||
            !changed
        )
    }

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'documents'}))
    }, [])


    if (lang !== null)
        return (

            <div style={{display: 'grid', rowGap: '32px'}}>
                <Alert
                    type={'error'} message={status.message}
                    handleClose={() => setStatus({
                        error: false,
                        message: undefined
                    })} render={status.error}/>

                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.registration}</h4></legend>
                    <TextField
                        placeholder={'CPF'}
                        label={'CPF'}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'cpf', value: event.target.value})
                        }}
                        locale={props.locale}
                        value={props.documents === null ? null : props.documents.cpf}
                        required={true}
                        maxLength={11}
                        width={'calc(50% - 16px)'}
                    />

                    <TextField
                        placeholder={'RG'}
                        label={'RG'}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'rg', value: event.target.value})
                        }}
                        locale={props.locale}
                        value={props.documents === null ? null : props.documents.rg}
                        required={true}
                        maxLength={8}
                        width={'calc(50% - 16px)'}
                    />

                    <TextField
                        placeholder={lang.issuing}
                        label={lang.issuing}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'issuing_body', value: event.target.value})
                        }}
                        locale={props.locale}
                        value={props.documents === null ? null : props.documents.issuing_body}
                        required={true}
                        maxLength={8}
                        width={'calc(50% - 16px)'}
                    />


                    <DateField
                        placeholder={lang.dispatch}
                        label={lang.dispatch}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'dispatch_date', value: event.target.value})
                        }}
                        locale={props.locale}
                        value={props.documents === null ? null :
                            (typeof (props.documents.dispatch_date) === 'number' ?
                                new Date(props.documents.dispatch_date).toLocaleDateString().replace('/', '-')
                                :
                                props.documents.dispatch_date)
                        }
                        required={true}

                        width={'calc(50% - 16px)'}
                    />
                </fieldset>
                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.parents}</h4></legend>

                    <TextField
                        placeholder={lang.work}
                        label={lang.work}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'work_card', value: event.target.value})
                        }}
                        locale={props.locale}
                        value={props.documents === null ? null : props.documents.work_card}
                        required={true}

                        width={'calc(50% - 16px)'}
                    />
                    <TextField
                        placeholder={'PIS/PASEP'}
                        label={'PIS/PASEP'}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'pis', value: event.target.value})
                        }}
                        locale={props.locale}
                        value={props.documents === null ? null : props.documents.pis}
                        required={true}

                        width={'calc(50% - 16px)'}
                    />
                </fieldset>
                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.bank}</h4></legend>
                    <TextField
                        placeholder={lang.bank}
                        label={lang.bank}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'bank', value: event.target.value})
                        }}
                        locale={props.locale}
                        value={props.documents === null ? null : props.documents.bank}
                        required={false}
                        width={'calc(50% - 16px)'}
                    />
                    <TextField
                        placeholder={lang.agency}
                        label={lang.agency}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'agency', value: event.target.value})
                        }}
                        locale={props.locale}
                        value={props.documents === null ? null : props.documents.agency}
                        required={false}
                        width={'calc(50% - 16px)'}
                    />
                </fieldset>
                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.voter}</h4></legend>
                    <TextField
                        placeholder={lang.voter}
                        label={lang.voter}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'voter_registration', value: event.target.value})
                        }}
                        locale={props.locale}
                        value={props.documents === null ? null : props.documents.voter_registration}
                        required={false}
                        width={'100%'}
                    />
                    <TextField
                        placeholder={lang.section}
                        label={lang.section}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'electoral_section', value: event.target.value})
                        }}
                        locale={props.locale}
                        value={props.documents === null ? null : props.documents.electoral_section}
                        required={false}
                        width={'calc(50% - 16px)'}
                    />
                    <TextField
                        placeholder={lang.zone}
                        label={lang.zone}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'electoral_zone', value: event.target.value})
                        }}
                        locale={props.locale}
                        value={props.documents === null ? null : props.documents.electoral_zone}
                        required={false}
                        width={'calc(50% - 16px)'}
                    />
                </fieldset>

                <div className={shared.formSubmitContainer}>
                    <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                            fontColor={'white'} backgroundColor={'#0095ff'} handleClick={() => {
                        props.handleSubmit({data: props.documents, personID: props.id}).then(res => {
                            setChanged(!res)
                            if (props.setAccepted !== undefined)
                                props.setAccepted(res)
                        })
                    }}
                            disabled={disabled()} variant={'rounded'}
                            content={
                                props.create ? lang.create : lang.save
                            } justification={'center'} hoverHighlight={false}
                    />
                </div>
            </div>
        )
    else
        return null
}
DocumentsForm.propTypes = {
    id: PropTypes.number,
    documents: PropTypes.object,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    editable: PropTypes.bool,
    locale: PropTypes.string,
    setAccepted: PropTypes.func,
    create: PropTypes.bool,
}