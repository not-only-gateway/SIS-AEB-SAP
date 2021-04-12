import styles from "../../styles/components/form/Form.module.css";
import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";
import CollaborationForm from "./CollaborationForm";
import AccordionLayout from "../shared/layout/AccordionLayout";
import fetchComponentData from "../../utils/person/FetchData";

export default function Collaborations(props) {

    const [collaborations, setCollaborations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchComponentData({
            path: 'collaborations/all/' + props.id,
            params: {}
        }).then(res => {
            if (res !== null)
                setCollaborations(res)
        })
        setLoading(false)
    }, [])

    if (!loading)
        return (
            <div className={styles.collaborations_container} style={{marginBottom: '2vh', marginLeft: '.9vw'}}>
                {props.getTitle({
                    pageName: null,
                    pageTitle: 'Collaborations',
                    pageInfo: 'Basic form'
                })}
                {props.disabled ?
                    null :
                    <AccordionLayout
                        content={
                            <div style={{backgroundColor: !props.dark ? 'white' : '#303741'}}>
                                <CollaborationForm
                                    userID={props.id}
                                    create={true}
                                    dark={props.dark}
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
                        key={'create collaboration'}
                        disabled={!props.editable}
                        openSize={40}
                        closedSize={12.66667}
                    />
                }
                {props.editable ? collaborations.map(collaboration => (
                        <AccordionLayout
                            content={
                                <div style={{backgroundColor: !props.dark ? 'white' : '#303741'}}>

                                    <CollaborationForm
                                        collaborationID={collaboration.collaboration.id}
                                        userID={props.id}
                                        create={true}
                                        dark={props.dark}
                                        visible={props.editable}
                                        editable={props.editable}

                                    />
                                </div>
                            }
                            summary={
                                <div>
                                    <p style={{fontWeight: 450}}>{collaboration.unit.acronym}</p>
                                    <p style={{
                                        fontSize: '.8rem',
                                        fontWeight: 420,
                                        color: props.dark ? '#e2e2e2' : '#777777'
                                    }}>{collaboration.effective_role !== null ?
                                        (collaboration.effective_role.denomination +
                                            (collaboration.commissioned_role !== null ? ' - ' + collaboration.commissioned_role.denomination : ''))
                                        : null}</p>
                                </div>
                            }
                            key={collaboration.collaboration.id}
                            disabled={false}
                            openSize={43}
                            closedSize={12.66667}
                        />

                    )) :
                    null
                }
            </div>

        )
    else
        return null
}

Collaborations.propTypes={
    dark: PropTypes.bool,
    visible: PropTypes.bool,
    editable: PropTypes.bool,
    id: PropTypes.number,
    getTitle: PropTypes.func
}
