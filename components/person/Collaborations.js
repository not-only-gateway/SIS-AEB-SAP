import styles from "../../styles/form/Form.module.css";
import {Button, Modal} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Host from "../../utils/Host";
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

    function renderModal() {
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
                        setModal={setModal}
                    />
                </div>
            </Modal>
        )
    }

    async function fetchData() {
        await props.fetchData('collaborations', {id: props.id}).then(res => {
            if (res !== null)
                setCollaborations(res)

        })
        setLoading(false)
    }

    useEffect(() => {
        fetchData().catch(r => console.log(r))
    }, [])

    return (
        <fieldset className={styles.form_component_container}
                  style={{border: (props.dark ? 'none' : '#e2e2e2 1px solid'), backgroundColor: props.dark ? '#3b424c' : null}}>
            {renderModal()}
            <legend style={{paddingLeft: '10px', paddingRight: '10px'}}>
                <p style={{fontSize: '1.2rem', fontWeight: 450}}>Collaborations</p>
            </legend>
            <div className={styles.form_component_container} style={{justifyContent: 'initial'}}>
                <div className={styles.collaboration_container} style={{
                    backgroundColor: props.dark ? '#484c55' : null,
                    border: !props.dark ? '#e2e2e2 1px solid' : null,
                    justifyContent: 'center',
                    minWidth: '7.5vw', maxWidth: '7.5vw'
                }}>
                    <Button style={{width: '100%', height: '100%', borderRadius: '8px'}} onClick={() => setModal(true)}>
                        <AddRounded/>
                    </Button>
                </div>

                {collaborations.map(collaboration => (
                        <div className={styles.collaboration_container} style={props.dark ? {
                            backgroundColor: '#484c55', justifyContent: 'center'
                        } : {
                            border: '#e2e2e2 1px solid', justifyContent: 'center'
                        }}>
                            <Button style={{width: '100%', height: '100%', borderRadius: '8px', display: 'block', lineHeight: '7px'}}
                                    onClick={() => {
                                        setModal(true)
                                        setSelected(collaboration.id)
                                    }}>
                                <p style={{fontWeight: 450}}>{collaboration.unity.acronym} - {collaboration.unity.name}</p>
                                <p style={{fontSize: '.8rem', fontWeight: 420, color: props.dark? '#e2e2e2' : '#777777'}}>{collaboration.role.denomination} - {collaboration.linkage.description}</p>
                            </Button>
                        </div>
                ))}
            </div>


        </fieldset>

    )

}

Collaborations.propTypes = {
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.number,
    fetchData: PropTypes.func,
    saveChanges: PropTypes.func,
}
