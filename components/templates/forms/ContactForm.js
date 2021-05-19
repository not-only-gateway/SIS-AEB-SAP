
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../../modules/InputLayout";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import TextField from "../../modules/inputs/TextField";
import Button from "../../modules/inputs/Button";

export default function ContactForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)

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

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'contact'}))
    }, [])


    if (lang !== null)
        return (
            <div style={{
                display: 'inline-flex',
                flexFlow: 'row wrap',
                rowGap: '8px',
                columnGap: '32px',
                justifyContent: 'center',
                width: '100%',
            }}>

                <TextField placeholder={lang.email} label={lang.email} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_email', value: event.target.value})
                }} locale={props.locale} value={props.contact === null ? null : props.contact.personal_email} required={true} width={'calc(50% - 16px)'}/>
                <TextField placeholder={lang.altEmail} label={lang.altEmail} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_email_alt', value: event.target.value})
                }} locale={props.locale} value={props.contact === null ? null : props.contact.personal_email_alt} required={false} width={'calc(50% - 16px)'}/>


                <TextField placeholder={lang.phone} label={lang.phone} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_phone', value: event.target.value})
                }} locale={props.locale} value={props.contact === null ? null : props.contact.personal_phone} required={true} width={'calc(50% - 16px)'}
                           maxLength={undefined} phoneMask={true}/>


                <TextField placeholder={lang.altPhone} label={lang.altPhone} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'personal_phone_alt', value: event.target.value})
                }} locale={props.locale} value={props.contact === null ? null : props.contact.personal_phone_alt} required={false} width={'calc(50% - 16px)'}
                           maxLength={undefined} phoneMask={true}/>

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