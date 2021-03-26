import styles from "../../../styles/form/Form.module.css";
import React from "react";

import ContactForm from "./sub/ContactForm";
import BasicForm from "./sub/BasicForm";
import DocumentsForm from "./sub/DocumentsForm";
import AddressForm from "../shared/AddressForm";


export default function ProfileForm(props) {

    const selectStyle = {
        width: '32%',
        backgroundColor: !props.dark ? '#f7f8fa' : '#272e38',
    }
    const mediumContainer = {width: '22vw', backgroundColor: !props.dark ? '#f7f8fa' : '#272e38'}
    const smallContainer = {width: '32%', backgroundColor: !props.dark ? '#f7f8fa' : '#272e38'}

    return (
        <div className={styles.forms_container}>
            <BasicForm id={props.id} mediumContainer={mediumContainer} smallContainer={smallContainer} selectStyle={selectStyle}
                       dark={props.dark} disabled={props.disabled}/>
            <ContactForm id={props.id} mediumContainer={mediumContainer} smallContainer={smallContainer} selectStyle={selectStyle}
                         dark={props.dark} disabled={props.disabled}/>
            <DocumentsForm id={props.id} mediumContainer={mediumContainer} smallContainer={smallContainer} selectStyle={selectStyle}
                           dark={props.dark} disabled={props.disabled}/>
            <AddressForm id={props.id} mediumContainer={mediumContainer} smallContainer={smallContainer} selectStyle={selectStyle}
                         dark={props.dark} disabled={props.disabled}/>
        </div>
    )

}


