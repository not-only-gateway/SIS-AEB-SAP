import styles from "../../styles/form/Form.module.css";
import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Skeleton} from "@material-ui/lab";
import PropTypes from "prop-types";
import InputLayout from "../shared/InputLayout";

export default function ContactForm(props) {


    const [email, setEmail] = useState(null)
    const [emailAlt, setEmailAlt] = useState(null)
    const [phone, setPhone] = useState(null)
    const [phoneAlt, setPhoneAlt] = useState(null)
    const [changed, setChanged] = useState(false)
    const [loading, setLoading] = useState(true)

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

       setLoading(false)
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

    if (!loading)
        return (
            <fieldset className={styles.form_component_container} style={{border: (props.dark ? 'none' : '#e2e2e2 1px solid'), backgroundColor: props.dark ? '#3b424c' : null}}>
                <legend style={{paddingRight: '10px', paddingLeft: '10px'}}>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Contact</p>
                </legend>
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

                <Button style={{width: '45vw'}} disabled={!changed}
                        onClick={() => saveChanges()}>Save</Button>
            </fieldset>

        )
    else
        return (
            <fieldset className={styles.form_component_container}
                 style={{border: (props.dark ? 'none' : '#e2e2e2 1px solid'), backgroundColor: props.dark ? '#3b424c' : null}}>
                <legend>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Contact</p>
                </legend>
                <Skeleton variant="rect" style={{
                    borderRadius: '8px',
                    marginBottom: '2vh',
                    width: '45vw',
                    height: '6vh',
                    backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                }}/>
                <Skeleton variant="rect" style={{
                    borderRadius: '8px',
                    marginBottom: '2vh',
                    width: '45vw',
                    height: '6vh',
                    backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                }}/>
                <Skeleton variant="rect" style={{
                    borderRadius: '8px',
                    marginBottom: '2vh',
                    width: '45vw',
                    height: '6vh',
                    backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                }}/>
            </fieldset>
        )
}

ContactForm.propTypes = {
    id: PropTypes.string,
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    saveChanges: PropTypes.func,
    fetchData: PropTypes.func,
}