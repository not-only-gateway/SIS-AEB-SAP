import styles from "../../styles/form/Form.module.css";
import {Accordion, AccordionDetails, AccordionSummary, Modal} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import {AddRounded, ExpandMoreRounded} from "@material-ui/icons";
import CollaborationForm from "./CollaborationForm";
import AccordionLayout from "../shared/layout/AccordionLayout";

const cookies = new Cookies()

export default function Collaborations(props) {

    const [collaborations, setCollaborations] = useState([])
    const [loading, setLoading] = useState(true)

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

    if(!loading)
        return (
            <div className={styles.collaborations_container} style={{marginBottom: '2vh', marginLeft: '.9vw'}}>
                {props.getTitle({
                    pageName: null,
                    pageTitle: 'Collaborations',
                    pageInfo: 'Basic form'
                })}
                {props.disabled ?
                    null:
                    <AccordionLayout
                        content={
                            <div style={{backgroundColor: !props.dark ? 'white' : '#303741'}}>
                                <CollaborationForm
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
                        disabled={props.disabled}
                        openSize={40}
                        closedSize={12.66667}
                    />
                }
                {collaborations.map(collaboration => (
                    <AccordionLayout
                        content={
                            <div style={{backgroundColor: !props.dark ? 'white' : '#303741'}}>

                                <CollaborationForm
                                    collaborationID={collaboration.id}
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
                        }
                        summary={
                          <div>
                              <p style={{fontWeight: 450}}>{collaboration.unit.acronym} - {collaboration.unit.name}</p>
                              <p style={{
                                  fontSize: '.8rem',
                                  fontWeight: 420,
                                  color: props.dark ? '#e2e2e2' : '#777777'
                              }}>{collaboration.role.denomination} - {collaboration.linkage.description}</p>
                          </div>
                        }
                        disabled={props.disabled}
                        openSize={40}
                        closedSize={12.66667}
                    />

                ))}
            </div>

        )
    else
        return null
}

Collaborations.propTypes = {
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.number,
    fetchData: PropTypes.func,
    saveChanges: PropTypes.func,
    getTitle: PropTypes.func
}
