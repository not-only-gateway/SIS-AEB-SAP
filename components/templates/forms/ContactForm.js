import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../../modules/InputLayout";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import TextField from "../../modules/TextField";

export default function ContactForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)

    function disabled() {
        return (
            props.contact.personal_email === null ||
            props.contact.personal_phone === null ||
            !props.contact.personal_email ||
            !props.contact.personal_phone ||
            !changed
        )
    }

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'contact'}))
    }, [])


    if (lang !== null)
        return (
            <form style={{
                display: 'inline-flex',
                flexFlow: 'row wrap',
                gap: '32px',
                justifyContent: 'center',
                width: '75%',
            }}>

                <TextField placeholder={lang.email} label={lang.email} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_email', value: event.target.value})
                }} locale={props.locale} value={props.contact.personal_email} required={true} width={'100%'}/>
                <TextField placeholder={lang.altEmail} label={lang.altEmail} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_email_alt', value: event.target.value})
                }} locale={props.locale} value={props.contact.personal_email_alt} required={false} width={'100%'}/>


                <TextField placeholder={lang.phone} label={lang.phone} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_phone', value: event.target.value})
                }} locale={props.locale} value={props.contact.personal_phone} required={true} width={'100%'}
                           maxLength={undefined} phoneMask={true}/>


                <TextField placeholder={lang.altPhone} label={lang.altPhone} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_phone_alt', value: event.target.value})
                }} locale={props.locale} value={props.contact.personal_phone_alt} required={false} width={'100%'}
                           maxLength={undefined} phoneMask={true}/>

                {!props.editable ? null :
                    <button type={"submit"} style={{
                        width: '100%',
                        backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                        color: disabled() ? '#777777' : 'white',
                        borderRadius: '5px',
                        boxShadow: 'unset',
                        outline: 'none',
                        border: 'none',
                        fontSize: '1rem',
                        padding: '5px'
                    }} disabled={disabled()} onClick={() => {
                        props.handleSubmit({data: props.contact, personID: props.id}).then(res => {
                            setChanged(!res)
                            if (props.setAccepted !== undefined)
                                props.setAccepted(res)
                        })
                    }}>
                        {props.create ? lang.create : lang.save}
                    </button>
                }
            </form>

        )
    else
        return null
}

ContactForm.propTypes = {
    id: PropTypes.number,
    contacts: PropTypes.object,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    editable: PropTypes.bool,
    locale: PropTypes.string,
    setAccepted: PropTypes.func,
    create: PropTypes.bool,
}