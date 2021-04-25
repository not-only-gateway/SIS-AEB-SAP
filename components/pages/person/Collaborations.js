import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";
import CollaborationForm from "./CollaborationForm";
import AccordionLayout from "../../layout/AccordionLayout";
import fetchComponentData from "../../../utils/person/FetchData";
import shared from '../../../styles/shared/Shared.module.css'
import {Divider} from "@material-ui/core";

export default function Collaborations(props) {

    const [collaborations, setCollaborations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        setLoading(true)
        fetchComponentData({
            path: 'collaborations/all/' + props.id,
            params: {}
        }).then(res => {
            if (res !== null)
                setCollaborations(res)
        })
        setLoading(false)
    }

    if (!loading)
        return (
            <div style={{

                width: '100%',
                display: 'grid',
                justifyItems: 'center',
                gap: '.9vw'
            }}>
                {!props.editionMode ?
                    null :
                    <AccordionLayout
                        content={
                            <CollaborationForm
                                userID={props.id}
                                create={true}
                                dark={props.dark}
                                editable={props.editionMode}
                                visible={props.editionMode}
                                fetchData={fetchData}
                                index={0}
                            />
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
                        key={'create collaborations'}
                        disabled={!props.editionMode}
                        openSize={68}
                        dark={props.dark}
                        closedSize={68}
                    />
                }
                {collaborations.map((collaboration, index) => (
                    <AccordionLayout
                        content={

                            <CollaborationForm
                                collaborationID={collaboration.collaboration.id}
                                userID={props.id}
                                create={true}
                                fetchData={fetchData}
                                dark={props.dark}
                                editable={props.editionMode}
                                index={index+1}
                            />
                        }
                        summary={
                            <div className={shared.accordionTitle}>
                                <p style={{fontWeight: 450}}>{collaboration.unit.acronym}</p>
                                <Divider style={{width: '10px', marginRight: '10px', marginLeft: '10px'}}/>
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
                        disabled={!props.editionMode}
                        openSize={68}
                        closedSize={68}
                        dark={props.dark}
                        background={'#484c55'}
                    />

                ))
                }
            </div>

        )
    else
        return null
}

Collaborations.propTypes = {
    dark: PropTypes.bool,
    editionMode: PropTypes.bool,
    id: PropTypes.number,
    locale: PropTypes.string
}
