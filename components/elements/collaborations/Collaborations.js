import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";
import CollaborationForm from "../../modules/forms/CollaborationForm";
import Accordion from "../../layout/Accordion";
import fetchComponentData from "../../../utils/person/FetchData";
import shared from '../../../styles/shared/Shared.module.css'
import {Divider} from "@material-ui/core";
import CollaborationSummary from "./CollaborationSummary";
import mainStyles from '../../../styles/shared/Main.module.css'

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
                    <Accordion
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
                            <div className={mainStyles.displayInlineStart} style={{width: 'fit-content'}}>
                                <AddRounded/>
                                <Divider orientation={'horizontal'} style={{
                                    width: '10px',
                                    marginRight: '10px',
                                    marginLeft: '10px',
                                    color: '#262626'
                                }}/>
                                <p>New Collaboration</p>
                            </div>
                        }
                        key={'create collaborations'}
                        disabled={!props.editionMode}
                        openSize={100}
                        dark={false}
                        closedSize={100}
                    />
                }
                {collaborations.map((collaboration, index) => (
                    <Accordion
                        content={

                            <CollaborationForm
                                collaborationID={collaboration.collaboration.id}
                                userID={props.id}
                                create={true}
                                fetchData={fetchData}
                                dark={props.dark}
                                editable={props.editionMode}
                                index={index + 1}
                            />
                        }
                        summary={
                            <CollaborationSummary
                                commissionedRole={collaboration.commissioned_role !== null ? collaboration.commissioned_role.denomination : null}
                                substitute={collaboration.collaboration.is_substitute}
                                activeRole={collaboration.collaboration.is_active_on_role}
                                mainCollaboration={collaboration.collaboration.main_collaboration}
                                effectiveRole={collaboration.effective_role !== null ? collaboration.effective_role.denomination : null}
                                additionalRoleInfo={collaboration.collaboration.additional_info}
                                unit={collaboration.unit.acronym}/>
                        }
                        key={collaboration.collaboration.id}
                        disabled={!props.editionMode}
                        openSize={100}
                        closedSize={100}
                        dark={false}
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
    id: PropTypes.string,
    locale: PropTypes.string
}
