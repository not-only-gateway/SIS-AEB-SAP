import styles from "../../../../styles/form/Form.module.css";
import React, {useState} from "react";
import PropTypes from 'prop-types'
import ContactForm from "./ContactForm";
import BasicForm from "./BasicForm";
import DocumentsForm from "./DocumentsForm";
import AddressForm from "../../shared/AddressForm";
import axios from "axios";
import Host from "../../../../config/Host";
import Cookies from "universal-cookie/lib";
import {Button} from "@material-ui/core";

const cookies = new Cookies()

export default function ProfileForm(props) {

    const selectStyle = {
        width: '32%',
        backgroundColor: !props.dark ? '#f7f8fa' : '#272e38',
        marginBottom: '2vh'
    }
    const mediumContainer = {width: '49%', backgroundColor: !props.dark ? '#f7f8fa' : '#272e38', marginBottom: '2vh'}
    const smallContainer = {width: '32%', backgroundColor: !props.dark ? '#f7f8fa' : '#272e38', marginBottom: '2vh'}

    async function fetchData(path){
        let response = null
        try {
            await axios({
                method: 'get',
                url: Host() + 'person'+path,
                headers: {'authorization': cookies.get('jwt')},
                params: {
                    id: props.id
                }
            }).then(res => {
                response = res.data
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }

        return response
    }

    async function saveChanges(data, path){
        let response = false
        try {
            await axios({
                method: 'put',
                url: Host() + 'person'+path,
                headers: {'authorization': cookies.get('jwt')},
                data: data
            }).then(() => {
                response = true
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }

        return response
    }

    return (
        <div className={styles.form_container}>
            <BasicForm id={props.id} mediumContainer={mediumContainer} smallContainer={smallContainer}
                       selectStyle={selectStyle}
                       saveChanges={saveChanges}
                       fetchData={fetchData}
                       dark={props.dark} disabled={props.disabled}/>
            <ContactForm id={props.id} mediumContainer={mediumContainer} smallContainer={smallContainer}
                         selectStyle={selectStyle}
                         saveChanges={saveChanges}
                         fetchData={fetchData}
                         dark={props.dark} disabled={props.disabled}/>
            <DocumentsForm id={props.id} mediumContainer={mediumContainer} smallContainer={smallContainer}
                           selectStyle={selectStyle}
                           saveChanges={saveChanges}
                           fetchData={fetchData}
                           dark={props.dark} disabled={props.disabled}/>
            <AddressForm id={props.id} mediumContainer={mediumContainer} smallContainer={smallContainer}
                         selectStyle={selectStyle}
                         saveChanges={saveChanges}
                         fetchData={fetchData}
                         dark={props.dark} disabled={props.disabled}/>
        </div>
    )

}

ProfileForm.propTypes = {
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.number
}
