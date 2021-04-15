import styles from "../../styles/person/Form.module.css";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";
import CollaborationForm from "./CollaborationForm";
import AccordionLayout from "../shared/layout/AccordionLayout";
import fetchComponentData from "../../utils/person/FetchData";
import shared from '../../styles/shared/Shared.module.css'
import {Divider} from "@material-ui/core";
import getTitle from "../../utils/person/GetTitle";
import mainStyles from '../../styles/shared/Main.module.css'

export default function Collaborations(props) {

    const [collaborations, setCollaborations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])
    async function fetchData(){
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
            <div className={[mainStyles.normalBorder, mainStyles.displayWarp, mainStyles.mediumWidth].join(' ')} style={{marginBottom: '2vh',}}>
                {getTitle({
                    pageTitle: 'Collaborations',
                    pageInfo: 'Basic form',
                    dark: props.dark
                })}
                {!props.editable ?
                    null :
                    <AccordionLayout
                        content={
                            <CollaborationForm
                                userID={props.id}
                                create={true}
                                dark={props.dark}
                                editable={props.editable}
                                visible={props.visible}
                                fetchData={fetchData}
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
                        disabled={!props.editable}
                        openSize={43}
                        dark={props.dark}
                        closedSize={43}
                        background={'#484c55'}
                    />
                }
                {props.editable ? collaborations.map(collaboration => (
                        <AccordionLayout
                            content={

                                <CollaborationForm
                                    collaborationID={collaboration.collaboration.id}
                                    userID={props.id}
                                    create={true}
                                    fetchData={fetchData}
                                    dark={props.dark}
                                    visible={props.editable}
                                    editable={props.editable}
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
                            disabled={false}
                            openSize={43}
                            closedSize={43}
                            dark={props.dark}
                            background={'#484c55'}
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
    locale: PropTypes.string
}
