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
            <div style={{
                display: 'inline-flex',
                flexFlow: 'row wrap',
                gap: '32px',
                justifyContent: 'center',
                width: '75%',
            }}>
                <h4 style={{width: '100%', marginTop: 'auto', marginBottom: 'auto'}}>
                    Emails
                </h4>
                <InputLayout inputName={lang.email} dark={props.dark} handleChange={props.handleChange}
                             name={'personal_email'}
                             inputType={0} disabled={!props.editable} size={'100%'} required={true}
                             initialValue={props.contact.personal_email} key={"3-1"} setChanged={setChanged}/>

                <InputLayout inputName={lang.altEmail} dark={props.dark} handleChange={props.handleChange}
                             name={'personal_email_alt'}
                             inputType={0} disabled={!props.editable} size={'100%'} required={false}
                             initialValue={props.contact.personal_email_alt} key={"3-2"} setChanged={setChanged}/>
                <h4 style={{width: '100%', marginBottom: 'auto'}}>
                    {lang.phones}
                </h4>

                <TextField placeholder={lang.phone} label={lang.phone} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_phone', value: event.target.value})
                }} locale={props.locale} value={props.contact.personal_phone} required={true} width={'100%'} maxLength={undefined} phoneMask={true}/>


                <TextField placeholder={lang.altPhone} label={lang.altPhone} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_phone_alt', value: event.target.value})
                }} locale={props.locale} value={props.contact.personal_phone_alt} required={true} width={'100%'} maxLength={undefined} phoneMask={true}/>

                {!props.editable ? null :
                    <Button style={{
                        width: '100%',
                        backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                        color: disabled() ? '#777777' : 'white',
                        fontWeight: 550,

                    }} disabled={disabled()} variant={'contained'} onClick={() => {
                        props.handleSubmit({data: props.contact, personID: props.id}).then(res => {
                            setChanged(!res)
                            if (props.setAccepted !== undefined)
                                props.setAccepted(res)
                        })
                    }}>
                        {props.create ? lang.create : lang.save}
                    </Button>
                }
            </div>

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