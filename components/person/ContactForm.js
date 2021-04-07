import styles from "../../styles/form/Form.module.css";
import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Skeleton} from "@material-ui/lab";
import PropTypes from "prop-types";
import InputLayout from "../shared/InputLayout";

export default function ContactForm(props) {


    const [email, setEmail] = useState('')
    const [emailAlt, setEmailAlt] = useState(null)
    const [phone, setPhone] = useState('')
    const [phoneAlt, setPhoneAlt] = useState(null)
    const [changed, setChanged] = useState(false)

    function disabled() {
        return (
            email.length === 0 ||
            phone.length === 0 ||
            changed === false
        )
    }

    useEffect(() => {
        fetchData().catch(error => console.log(error))
    }, [])

    async function fetchData() {
        await props.fetchData('person/contact', {id: props.id}).then(res => {
            if (res !== null) {
                setEmail(res.email)
                setEmailAlt(res.email_alt)
                setPhone(res.phone)
                setPhoneAlt(res.phone_alt)
            }

        })
    }


    async function saveChanges() {
        await props.saveChanges(
            'person/contact',
            {
                id: props.id,
                email: email,
                email_alt: emailAlt,
                phone: phone,
                phone_alt: phoneAlt
            },
            'put'
        ).then(res => res ? setChanged(false) : console.log(res))

    }

    return (
        <div className={styles.form_component_container}>
            <InputLayout inputName={'Email'} dark={props.dark} handleChange={setEmail}
                         inputType={0} disabled={props.disabled} size={49} required={true}
                         initialValue={email} key={"3-1"} setChanged={setChanged}/>

            <InputLayout inputName={'Alternative Email'} dark={props.dark} handleChange={setEmailAlt}
                         inputType={0} disabled={props.disabled} size={49} required={false}
                         initialValue={emailAlt} key={"3-2"} setChanged={setChanged}/>

            <InputLayout inputName={'Phone'} dark={props.dark} handleChange={setPhone}
                         inputType={0} disabled={props.disabled} size={49} required={true}
                         initialValue={phone} key={"3-3"} setChanged={setChanged}/>

            <InputLayout inputName={'Alternative Phone'} dark={props.dark} handleChange={setPhoneAlt}
                         inputType={0} disabled={props.disabled} size={49} required={false}
                         initialValue={phoneAlt} key={"3-4"} setChanged={setChanged}/>

            <Button style={{
                width: '43vw', margin: '2vh auto',
                backgroundColor: disabled() ? null : '#39adf6',
                color: disabled() ? null : 'white'
            }} variant={'contained'} disableElevation
                    disabled={disabled()}
                    onClick={() => saveChanges()}>Save</Button>
        </div>
    )
}

ContactForm.propTypes = {
    id: PropTypes.string,
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    saveChanges: PropTypes.func,
    fetchData: PropTypes.func,
}