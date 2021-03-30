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
import Collaborations from "./Collaborations";

const cookies = new Cookies()

export default function Profile(props) {
    //
    // async function fetchData(path){
    //     let response = null
    //     try {
    //         await axios({
    //             method: 'get',
    //             url: Host() + 'person'+path,
    //             headers: {'authorization': cookies.get('jwt')},
    //             params: {
    //                 id: props.id
    //             }
    //         }).then(res => {
    //             response = res.data
    //         }).catch(error => {
    //             console.log(error)
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    //
    //     return response
    // }
    //
    // async function saveChanges(data, path){
    //     let response = false
    //     try {
    //         await axios({
    //             method: 'put',
    //             url: Host() + 'person'+path,
    //             headers: {'authorization': cookies.get('jwt')},
    //             data: data
    //         }).then(() => {
    //             response = true
    //         }).catch(error => {
    //             console.log(error)
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    //
    //     return response
    // }

    return (
        <div className={styles.form_container}>
            <BasicForm
                id={props.id}
                mediumContainer={props.mediumContainer}
                smallContainer={props.smallContainer}
                selectStyle={props.selectStyle}
                saveChanges={props.saveChanges}
                fetchData={props.fetchData}
                dark={props.dark}
                disabled={props.disabled}/>
            <Collaborations
                id={props.id}
                mediumContainer={props.mediumContainer}
                smallContainer={props.smallContainer}
                selectStyle={props.selectStyle}
                saveChanges={props.saveChanges}
                fetchData={props.fetchData}
                dark={props.dark}
                disabled={props.disabled}
            />
            <ContactForm
                id={props.id}
                mediumContainer={props.mediumContainer}
                smallContainer={props.smallContainer}
                selectStyle={props.selectStyle}
                saveChanges={props.saveChanges}
                fetchData={props.fetchData}
                dark={props.dark}
                disabled={props.disabled}
            />
            <AddressForm
                id={props.id}
                mediumContainer={props.mediumContainer}
                smallContainer={props.smallContainer}
                selectStyle={props.selectStyle}
                saveChanges={props.saveChanges}
                fetchData={props.fetchData}
                dark={props.dark}
                disabled={props.disabled}/>
            <DocumentsForm
                id={props.id}
                mediumContainer={props.mediumContainer}
                smallContainer={props.smallContainer}
                selectStyle={props.selectStyle}
                saveChanges={props.saveChanges}
                fetchData={props.fetchData}
                dark={props.dark}
                disabled={props.disabled}/>

        </div>
    )

}

Profile.propTypes = {
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.number,
    fetchData: PropTypes.func,
    saveChanges: PropTypes.func,
    mediumContainer: PropTypes.object,
    smallContainer: PropTypes.object,
    selectStyle: PropTypes.object,
}
