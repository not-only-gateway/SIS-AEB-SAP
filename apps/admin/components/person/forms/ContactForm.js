import React, {useState} from "react";
import PropTypes from "prop-types";

import {Button, TextField, DropDownField, DateField, Selector} from "sis-aeb-inputs";
import shared from "../../../styles/shared/Shared.module.css";
import ContactFormPT from "../../../packages/locales/person/ContactFormPT";

export default function ContactForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = ContactFormPT

    function disabled() {
        return (
            props.contact === null ||
            props.contact.personal_email === null ||
            props.contact.personal_phone === null ||
            !props.contact.personal_email ||
            !props.contact.personal_phone ||
            !changed
        )
    }

    return (
        <div style={{
            display: 'inline-flex',
            flexFlow: 'row wrap',

            gap: '32px',
            justifyContent: 'center',
            width: '100%',
        }}>
            <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.emails}</h4></legend>
                <TextField
                    dark={true}
                    placeholder={lang.email} label={lang.email} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_email', value: event.target.value})
                }} locale={props.locale} value={props.contact === null ? null : props.contact.personal_email}
                    required={true} width={'calc(50% - 16px)'}/>

                <TextField
                    dark={true}
                    placeholder={lang.altEmail} label={lang.altEmail} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_email_alt', value: event.target.value})
                }} locale={props.locale} value={props.contact === null ? null : props.contact.personal_email_alt}
                    required={false} width={'calc(50% - 16px)'}/>
            </fieldset>
            <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.phones}</h4></legend>
                <TextField
                    dark={true}
                    placeholder={lang.phone} label={lang.phone} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_phone', value: event.target.value})
                }} locale={props.locale} value={props.contact === null ? null : props.contact.personal_phone}
                    required={true} width={'calc(50% - 16px)'}
                    maxLength={undefined} phoneMask={true}/>


                <TextField
                    dark={true}
                    placeholder={lang.altPhone} label={lang.altPhone} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_phone_alt', value: event.target.value})
                }} locale={props.locale} value={props.contact === null ? null : props.contact.personal_phone_alt}
                    required={false} width={'calc(50% - 16px)'}
                    maxLength={undefined} phoneMask={true}/>
            </fieldset>
            <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                    fontColor={'white'} backgroundColor={'#0095ff'} handleClick={() => {
                props.handleSubmit({data: props.contact, personID: props.id}).then(res => {
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

    )

}

ContactForm.propTypes = {
    id: PropTypes.number,
    contacts: PropTypes.object,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    editable: PropTypes.bool,
    setAccepted: PropTypes.func,
    create: PropTypes.bool,
}