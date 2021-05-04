import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../../modules/InputLayout";
import fetchComponentData from "../../../utils/person/FetchData";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";

export default function ContactForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)

    function disabled() {
        return (
            props.contact.email === null ||
            props.contact.phone === null ||
            props.contact.email ||
            props.contact.phone ||
            changed
        )
    }

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'contact'}))
    }, [])


    if (lang !== null)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center', width: '100%'}}>
                <InputLayout inputName={lang.email} dark={props.dark} handleChange={props.handleChange} name={'email'}
                             inputType={0} disabled={!props.editable} size={'calc(50% - 8px)'} required={true}
                             initialValue={props.contact.email} key={"3-1"} setChanged={setChanged}/>

                <InputLayout inputName={lang.altEmail} dark={props.dark} handleChange={props.handleChange} name={'alternative_email'}
                             inputType={0} disabled={!props.editable} size={'calc(50% - 8px)'} required={false}
                             initialValue={props.contact.alternative_email} key={"3-2"} setChanged={setChanged}/>

                <InputLayout inputName={lang.phone} dark={props.dark} handleChange={props.handleChange} name={'phone'}
                             inputType={0} disabled={!props.editable} size={'calc(50% - 8px)'} required={true} numeric={true}
                             initialValue={props.contact.phone} key={"3-3"} setChanged={setChanged}/>

                <InputLayout inputName={lang.altPhone} dark={props.dark} handleChange={props.handleChange} name={'alternative_phone'}
                             inputType={0} disabled={!props.editable} size={'calc(50% - 8px)'} required={false} numeric={true}
                             initialValue={props.contact.alternative_phone} key={"3-4"} setChanged={setChanged}/>

                {!props.editable ? null :
                    <Button style={{
                        width: '100%', marginTop: '50px',
                        backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                        color: '#777777',
                        fontWeight: 550,

                    }} disabled={disabled()} variant={'contained'} onClick={() => {
                        props.handleSubmit({contact: props.contact, personID: props.id}).then(res => {
                            setChanged(!res)
                            if (props.setAccepted !== undefined)
                                props.setAccepted(res.status)
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