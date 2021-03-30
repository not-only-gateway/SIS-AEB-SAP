import styles from "../../../../styles/form/Form.module.css";
import {Button, Modal} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Host from "../../../../config/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import {AddRounded, DeleteForeverRounded, DeleteRounded} from "@material-ui/icons";
import CollaborationForm from "./CollaborationForm";

const cookies = new Cookies()

export default function Collaborations(props) {

    const [collaborations, setCollaborations] = useState([])
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState(null)

    function renderModal(collaborationID) {
        return (
            <Modal open={modal} onClose={() => {
                setModal(false)
                setSelected(null)
            }}>
                <div className={styles.form_modal_container}
                     style={{backgroundColor: !props.dark ? 'white' : '#303741'}}>

                    <CollaborationForm
                        collaborationID={selected}
                        userID={props.id}
                        create={true}
                        dark={props.dark}
                        mediumContainer={props.mediumContainer}
                        smallContainer={props.smallContainer}
                        selectStyle={props.selectStyle}
                        fetchData={props.fetchData}
                        saveChanges={props.saveChanges}
                    />
                </div>
            </Modal>
        )
    }

    async function fetchData() {
        let response = await props.fetchData('collaborations', {id: props.id}).catch(error => console.log(error))
        if (response !== null) {
            setCollaborations(response)
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchData().catch(r => console.log(r))
    }, [])

    return (
        <div className={styles.form_component_container}
             style={{borderBottom: (props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid'), width: '100%'}}>
            {renderModal()}
            <legend style={{width: '100%'}}>
                <p style={{fontSize: '1.2rem', fontWeight: 450}}>Collaborations</p>
            </legend>
            {collaborations.map(collaboration => (
                <Button onClick={() => {
                    setModal(true)
                    setSelected(collaboration.id)
                }}>
                    <div className={styles.collaboration_container} style={props.dark ? {
                        backgroundColor: '#3b424c'
                    } : {
                        border: '#e2e2e2 1px solid'
                    }}>
                        psdads
                        <Button>
                            <DeleteForeverRounded/>
                        </Button>
                    </div>

                </Button>
            ))}

                <div className={styles.collaboration_container} style={props.dark ? {
                    backgroundColor: '#3b424c', justifyContent: 'center'
                } : {
                    border: '#e2e2e2 1px solid', justifyContent: 'center', width: '16%'
                }}>
                    <Button style={{width: '100%', height: '100%',borderRadius: '8px'}} onClick={() => setModal(true)}>
                        <AddRounded/>
                    </Button>
                </div>


        </div>

    )

}

Collaborations.propTypes = {
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.number,
    fetchData: PropTypes.func,
    saveChanges: PropTypes.func,
    mediumContainer: PropTypes.object,
    smallContainer: PropTypes.object,
    selectStyle: PropTypes.object,
}