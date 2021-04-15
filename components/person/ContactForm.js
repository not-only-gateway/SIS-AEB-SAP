import styles from "../../styles/person/Form.module.css";
import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../shared/layout/InputLayout";
import fetchComponentData from "../../utils/person/FetchData";
import saveComponentChanges from "../../utils/person/SaveChanges";
import getTitle from "../../utils/person/GetTitle";
import mainStyles from '../../styles/shared/Main.module.css'
import getComponentLanguage from "../../utils/person/GetLanguage";

export default function ContactForm(props) {


    const [email, setEmail] = useState('')
    const [emailAlt, setEmailAlt] = useState(null)
    const [phone, setPhone] = useState('')
    const [phoneAlt, setPhoneAlt] = useState(null)
    const [changed, setChanged] = useState(false)
    const [loading, setLoading] = useState(true)
    const [lang, setLang] = useState(null)

    function disabled() {
        return (
            email.length === 0 ||
            phone.length === 0 ||
            changed === false
        )
    }

    useEffect(() => {
        fetchComponentData({path: 'contact/' + props.id, params: {}}).then(res => {
            if (res !== null) {
                setEmail(res.email)
                setEmailAlt(res.email_alt)
                setPhone(res.phone)
                setPhoneAlt(res.phone_alt)
            }
            setLoading(false)
        })
        setLang(getComponentLanguage({locale: props.locale, component: 'contact'}))
    }, [])

    async function saveChanges() {
        await saveComponentChanges({
            path: 'contact/' + props.id,
            params: {
                id: props.id,
                email: email.toLowerCase(),
                email_alt: emailAlt?.toLowerCase(),
                phone: phone?.replace(' ', ''),
                phone_alt: phoneAlt?.toLowerCase()
            },
            method: 'put'
        }).then(res => res ? setChanged(false) : console.log(res))
    }

    if (!loading && lang !== null)
        return (
            <div className={[mainStyles.normalBorder, mainStyles.displayWarp, mainStyles.mediumWidth].join(' ')}>
                {getTitle({
                    pageTitle: lang.title,
                    pageInfo: lang.info,
                    dark: props.dark
                })}
                <InputLayout inputName={lang.email} dark={props.dark} handleChange={setEmail}
                             inputType={0} disabled={!props.editable} size={49} required={true}
                             initialValue={email} key={"3-1"} setChanged={setChanged}/>

                <InputLayout inputName={lang.altEmail} dark={props.dark} handleChange={setEmailAlt}
                             inputType={0} disabled={!props.editable} size={49} required={false}
                             initialValue={emailAlt} key={"3-2"} setChanged={setChanged}/>

                <InputLayout inputName={lang.phone} dark={props.dark} handleChange={setPhone}
                             inputType={0} disabled={!props.editable} size={49} required={true}
                             initialValue={phone} key={"3-3"} setChanged={setChanged}/>

                <InputLayout inputName={lang.altPhone} dark={props.dark} handleChange={setPhoneAlt}
                             inputType={0} disabled={!props.editable} size={49} required={false}
                             initialValue={phoneAlt} key={"3-4"} setChanged={setChanged}/>

                <Button style={{
                    width: '43vw', margin: 'auto auto .8vw',
                    backgroundColor: disabled() ? null : '#39adf6',
                    color: disabled() ? null : 'white'
                }} variant={'contained'} disableElevation
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