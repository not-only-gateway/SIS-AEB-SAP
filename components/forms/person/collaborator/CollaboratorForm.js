import styles from "../../../../styles/form/Form.module.css";
import {Button, Modal} from "@material-ui/core";
import React, {useState} from "react";
import axios from "axios";
import Host from "../../../../config/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";
import CollaborationForm from "./CollaborationForm";
import SimplifiedCollaboration from "./SimplifiedCollaboration";

const cookies = new Cookies()

export default function CollaboratorForm(props) {

    const [collaborations, setCollaborations] = useState([])
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const selectStyle = {
        width: '32%',
        backgroundColor: !props.dark ? '#f7f8fa' : '#272e38',
        marginBottom: '2vh'
    }
    const mediumContainer = {width: '49%', backgroundColor: !props.dark ? '#f7f8fa' : '#272e38', marginBottom: '2vh'}
    const smallContainer = {width: '32%', backgroundColor: !props.dark ? '#f7f8fa' : '#272e38', marginBottom: '2vh'}

    async function fetchData() {
        // simplified collaborations
        try {
            await axios({
                method: 'get',
                url: Host + 'collaborations',
                headers: {'authorization': cookies.get('jwt')},
                params: {
                    id: props.id
                }
            }).then(res => {
                setCollaborations(res.data)
                setLoading(false)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }


    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}>
                <div className={styles.form_modal_container}
                     style={{backgroundColor: !props.dark ? 'white' : '#303741'}}>
                    <CollaborationForm id={props.id}
                                       create={true}
                                       dark={props.dark}
                                       mediumContainer={mediumContainer}
                                       smallContainer={smallContainer}
                                       selectStyle={selectStyle}
                    />
                </div>
            </Modal>
        )
    }


    return (
        <div>
            {renderModal()}
            <div style={{marginTop: '2vh', marginBottom: '2vh', display: 'flex', justifyContent: 'flex-start'}}>
                <legend style={{width: '100%'}}>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Collaborations</p>
                </legend>
                <Button onClick={() => setModal(true)}><AddRounded/></Button>
            </div>
            {collaborations.map(collaboration => (
                <SimplifiedCollaboration id={collaboration.collaborator.id}
                                         dark={props.dark}
                                         mediumContainer={mediumContainer}
                                         smallContainer={smallContainer}
                                         selectStyle={selectStyle}
                />
            ))}
        </div>

    )

}

CollaboratorForm.propTypes = {
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.number
}