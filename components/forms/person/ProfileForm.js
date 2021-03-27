import styles from "../../../styles/form/Form.module.css";
import React, {useEffect} from "react";
import PropTypes from 'prop-types'
import ContactForm from "./sub/ContactForm";
import BasicForm from "./sub/BasicForm";
import DocumentsForm from "./sub/DocumentsForm";
import AddressForm from "../shared/AddressForm";


export default function ProfileForm(props) {

    const selectStyle = {
        width: '32%',
        backgroundColor: !props.dark ? '#f7f8fa' : '#272e38',
        marginBottom: '2vh'
    }
    const mediumContainer = {width: '49%', backgroundColor: !props.dark ? '#f7f8fa' : '#272e38', marginBottom: '2vh'}
    const smallContainer = {width: '32%', backgroundColor: !props.dark ? '#f7f8fa' : '#272e38', marginBottom: '2vh'}

    return (
        <div className={styles.profile_container}>
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

ProfileForm.propTypes = {
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.number
}
