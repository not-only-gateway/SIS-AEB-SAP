import styles from "../../styles/components/form/Form.module.css";
import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../shared/layout/InputLayout";
import fetchComponentData from "../../utils/person/FetchData";
import saveComponentChanges from "../../utils/person/SaveChanges";

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
        await fetchComponentData({path: 'contact/'+props.id, params: {}}).then(res => {
            if (res !== null) {
                setEmail(res.email)
                setEmailAlt(res.email_alt)
                setPhone(res.phone)
                setPhoneAlt(res.phone_alt)
            }

        })
    }


    async function saveChanges() {
        await saveComponentChanges({
            path: 'contact/'+props.id,
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

    return (
        <div className={styles.form_component_container}>
            {props.getTitle({
                pageName: null,
                pageTitle: 'Collaborations',
                pageInfo: 'Basic form'
            })}
            <InputLayout inputName={'Email'} dark={props.dark} handleChange={setEmail}
                         inputType={0} disabled={!props.editable} size={49} required={true}
                         initialValue={email} key={"3-1"} setChanged={setChanged}/>

            <InputLayout inputName={'Alternative Email'} dark={props.dark} handleChange={setEmailAlt}
                         inputType={0} disabled={!props.editable} size={49} required={false}
                         initialValue={emailAlt} key={"3-2"} setChanged={setChanged}/>

            <InputLayout inputName={'Phone'} dark={props.dark} handleChange={setPhone}
                         inputType={0} disabled={!props.editable} size={49} required={true}
                         initialValue={phone} key={"3-3"} setChanged={setChanged}/>

            <InputLayout inputName={'Alternative Phone'} dark={props.dark} handleChange={setPhoneAlt}
                         inputType={0} disabled={!props.editable} size={49} required={false}
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
    visible: PropTypes.bool,
    editable: PropTypes.bool,
    getTitle: PropTypes.func
}