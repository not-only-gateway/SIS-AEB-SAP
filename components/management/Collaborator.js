import PropTypes from 'prop-types'
import React, {useState} from "react";
import styles from '../../styles/person/Form.module.css'
import InputLayout from "../shared/layout/InputLayout";
import {Button} from "@material-ui/core";

export default function CollaboratorComponent(props){
    const [corpEmail, setCorpEmail] = useState('')
    const [extension, setExtension] = useState('')
    const [name, setName] = useState('')
    const [registration, setRegistration] = useState('')

    async function saveChanges(){

    }

    function disabled() {
        return (
            corpEmail.length === 0 ||
            extension.length === 0 ||
            name.length === 0 ||
            registration.length === 0
        )
    }
    return (
        <div className={styles.form_component_container}>
            <InputLayout inputName={'Corporate Email'} dark={props.dark} handleChange={setCorpEmail} inputType={0}
                         disabled={false} size={49} required={true} initialValue={corpEmail}
                         key={'collaborator-1'} setChanged={undefined}/>
            <InputLayout inputName={'Extension'} dark={props.dark} handleChange={setExtension} inputType={0}
                         disabled={false} size={49} required={true} initialValue={extension}
                         key={'collaborator-2'} setChanged={undefined}/>
            <InputLayout inputName={'Full Name'} dark={props.dark} handleChange={setName} inputType={0}
                         disabled={false} size={49} required={true} initialValue={name}
                         key={'collaborator-3'} setChanged={undefined}/>
            <InputLayout inputName={'Registration'} dark={props.dark} handleChange={setRegistration} inputType={0}
                         disabled={false} size={49} required={false} initialValue={registration}
                         key={'collaborator-4'} setChanged={undefined}/>

            <Button style={{
                width: '43vw', margin: '2vh auto',
                backgroundColor: disabled() ? null : '#39adf6',
                color: disabled() ? null : 'white'
            }} disableElevation
                disabled={disabled()}
                onClick={() => saveChanges()}>
                Create
            </Button>
        </div>
    )
}

CollaboratorComponent.propTypes={
    dark: PropTypes.bool,
}