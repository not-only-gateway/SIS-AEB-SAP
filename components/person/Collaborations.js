import styles from "../../styles/form/Form.module.css";
import {Accordion, AccordionDetails, AccordionSummary, Modal} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import {AddRounded, ExpandMoreRounded} from "@material-ui/icons";
import CollaborationForm from "./CollaborationForm";
import AccordionLayout from "../shared/AccordionLayout";

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
                  style={{
                      border: (props.dark ? 'none' : '#e2e2e2 1px solid'),
                      backgroundColor: props.dark ? '#3b424c' : null
                  }}>
            {/*{renderModal()}*/}
            <legend style={{paddingLeft: '10px', paddingRight: '10px'}}>
                <p style={{fontSize: '1.2rem', fontWeight: 450}}>Collaborations</p>
            </legend>
            <div className={styles.form_component_container} style={{justifyContent: 'initial'}}>
                {/*<div className={styles.collaboration_container} style={{*/}
                {/*    backgroundColor: props.dark ? '#484c55' : null,*/}
                {/*    border: !props.dark ? '#e2e2e2 1px solid' : null,*/}
                {/*    justifyContent: 'center',*/}
                {/*    minWidth: '7.5vw', maxWidth: '7.5vw'*/}
                {/*}}>*/}
                {/*    <Button style={{width: '100%', height: '100%', borderRadius: '8px'}} onClick={() => setModal(true)}>*/}
                {/*        <AddRounded/>*/}
                {/*    </Button>*/}
                {/*</div>*/}
                {/*<Accordion style={{width: '45vw'}}>*/}
                {/*    <AccordionSummary*/}
                {/*        expandIcon={<ExpandMoreRounded/>}*/}
                {/*        aria-controls="panel1a-content"*/}
                {/*        id="panel1a-header"*/}
                {/*    >*/}
                {/*        */}
                {/*    </AccordionSummary>*/}
                {/*    <AccordionDetails>*/}

                {/*    </AccordionDetails>*/}
                {/*</Accordion>*/}
                <AccordionLayout
                    content={
                        <div style={{backgroundColor: !props.dark ? 'white' : '#303741'}}>

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
                    }
                    summary={
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <AddRounded/>
                            <p>New Collaboration</p>
                        </div>
                    }
                    openSize={45}
                    closedSize={14.4}
                />
                {collaborations.map(collaboration => (
                    <AccordionLayout
                        content={
                            <div style={{backgroundColor: !props.dark ? 'white' : '#303741'}}>

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
                        }
                        summary={
                          <div>
                              <p style={{fontWeight: 450}}>{collaboration.unity.acronym} - {collaboration.unity.name}</p>
                              <p style={{
                                  fontSize: '.8rem',
                                  fontWeight: 420,
                                  color: props.dark ? '#e2e2e2' : '#777777'
                              }}>{collaboration.role.denomination} - {collaboration.linkage.description}</p>
                          </div>
                        }
                        openSize={45}
                        closedSize={14.4}
                    />

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
