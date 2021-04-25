import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../../layout/InputLayout";
import fetchComponentData from "../../../utils/person/FetchData";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetLanguage";

export default function ContactForm(props) {


    const [changed, setChanged] = useState(false)
    const [loading, setLoading] = useState(true)
    const [lang, setLang] = useState(null)
    const [contact, setContact] = useState({
        email: '',
        emailAlt: null,
        phone: '',
        phoneAlt:null
    })
    function handleChange(props) {

        setContact(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }
    function disabled() {
        return (
            contact.email.length === 0 ||
            contact.phone.length === 0 ||
            changed === false
        )
    }

    useEffect(() => {

        fetchComponentData({path: 'contact/' + props.id, params: {}}).then(res => {
            console.log(res)
            if (res !== null) {
                handleChange({name: 'email', value: res.personal_email !== null ? res.personal_email : ''})
                handleChange({name: 'phone', value:res.personal_phone !== null ? res.personal_phone : ''})
                handleChange({name: 'emailAlt', value: res.personal_email_alt !== null && res.personal_email_alt !== undefined ? res.personal_email_alt : ''})
                handleChange({name: 'phoneAlt', value: res.personal_phone_alt !== null && res.personal_phone_alt !== undefined ? res.personal_phone_alt : ''})
            }
            setLoading(false)
        })
        setLang(getComponentLanguage({locale: props.locale, component: 'contact'}))
    }, [])

    async function saveChanges() {

        await saveComponentChanges({
            path: 'contact/' + props.id,
            params: {
                person: props.id,
                personal_email: contact.email.toLowerCase(),
                personal_email_alt: contact.emailAlt.length > 0 ? contact.emailAlt?.toLowerCase() : null,
                personal_phone: contact.phone.replace(' ', ''),
                personal_phone_alt:contact.phoneAlt.length > 0 ? contact.phoneAlt?.toLowerCase() : null
            },
            method: 'put'
        }).then(res => res ? setChanged(false) : console.log(res))
    }

    if (!loading && lang !== null)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center'}}>
                <InputLayout inputName={lang.email} dark={props.dark} handleChange={handleChange} name={'email'}
                             inputType={0} disabled={!props.editable} size={48.5} required={true}
                             initialValue={contact.email} key={"3-1"} setChanged={setChanged}/>

                <InputLayout inputName={lang.altEmail} dark={props.dark} handleChange={handleChange} name={'emailAlt'}
                             inputType={0} disabled={!props.editable} size={48.5} required={false}
                             initialValue={contact.emailAlt} key={"3-2"} setChanged={setChanged}/>

                <InputLayout inputName={lang.phone} dark={props.dark} handleChange={handleChange} name={'phone'}
                             inputType={0} disabled={!props.editable} size={48.5} required={true} numeric={true}
                             initialValue={contact.phone} key={"3-3"} setChanged={setChanged}/>

                <InputLayout inputName={lang.altPhone} dark={props.dark} handleChange={handleChange} name={'phoneAlt'}
                             inputType={0} disabled={!props.editable} size={48.5} required={false} numeric={true}
                             initialValue={contact.phoneAlt} key={"3-4"} setChanged={setChanged}/>

                <Button style={{
                    width: '98%', marginTop: '50px',
                    backgroundColor: disabled() ? null : '#39adf6',

                }} variant={'contained'} color={'primary'}
                        disabled={disabled()}
                        onClick={() => saveChanges()}>{lang.save}</Button>
            </div>

        )
    else
        return null
}

ContactForm.propTypes = {
    id: PropTypes.string,
    dark: PropTypes.bool,
    visible: PropTypes.bool,
    editable: PropTypes.bool,
    locale: PropTypes.string
}