import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import styles from "../../styles/Person.module.css";
import CollaboratorRequests from "../../utils/fetch/CollaboratorRequests";
import MemberSubmitRequests from "../../utils/submit/MemberSubmitRequests";
import CollaboratorForm from "./forms/CollaboratorForm";
import shared from "../../styles/Shared.module.css";
import {AddRounded, ListRounded, MenuOpenRounded} from "@material-ui/icons";
import LinkageForm from "./LinkageForm";
import ProgressionList from "./ProgressionList";


export default function CorporateForms(props) {
    const [collaborator, setCollaborator] = useState(null)
    const [linkage, setLinkage] = useState(null)
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        if (collaborator === null && props.id !== null && props.id !== undefined) {
            CollaboratorRequests.fetchCollaborator({id: props.id}).then(res => {
                if (res !== null) {
                    setCollaborator(res)
                }
            })
            CollaboratorRequests.fetchLinkage(props.id).then(res => {
                if (res !== null) {
                    setLinkage(res)
                }
            })
        }
    }, [props])

    async function handleMemberSubmit(event) {
        let response = false
        if (collaborator === null || collaborator.person === undefined) {
            event.person = props.id
            MemberSubmitRequests.submitMember(event).then(() => props.fetchMembership())
        } else {
            response = await MemberSubmitRequests.submitMember(event)
        }

        return response
    }

    return (
        <div style={{width: '100%', display: 'grid', gap: '16px', alignItems: 'flex-start', justifyItems: 'center'}}>
            <div style={{width: '100%'}}>

                {openTab === 0 ?
                    <div className={styles.personOptionsContainer}>

                        <button className={shared.buttonContainer} onClick={() => setOpenTab(1)}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: '8px'
                            }}>
                                <AddRounded style={{display: collaborator === null ? undefined : 'none'}}/>
                                {props.lang.collaborator}
                            </div>
                            <MenuOpenRounded style={{display: collaborator === null ? 'none' : undefined}}/>
                        </button>
                        <button className={shared.buttonContainer} onClick={() => setOpenTab(2)}
                                style={{display: collaborator !== null ? undefined : 'none'}}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: '8px'
                            }}>
                                <AddRounded style={{display: linkage === null ? undefined : 'none'}}/>
                                {props.lang.linkage}
                            </div>
                            <MenuOpenRounded style={{display: linkage === null ? 'none' : undefined}}/>
                        </button>
                        <button className={shared.buttonContainer} onClick={() => setOpenTab(3)}
                                style={{display: collaborator === null || linkage === null || linkage.id === undefined || linkage.effective_role === undefined || linkage.effective_role === null ? 'none' : undefined}}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: '8px'
                            }}>
                                <ListRounded style={{display: linkage === null ? undefined : 'none'}}/>
                                {props.lang.progression}
                            </div>
                            <MenuOpenRounded style={{display: linkage === null ? 'none' : undefined}}/>
                        </button>
                    </div>
                    :
                    null
                }
                {openTab === 1 ?
                    <CollaboratorForm
                        id={props.id}
                        data={collaborator}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCollaborator
                        })}
                        create={(collaborator === null || collaborator === undefined || collaborator === {}) || collaborator.person === null || collaborator.person === undefined}
                        handleSubmit={handleMemberSubmit}
                        returnToMain={() => setOpenTab(0)}
                        editable={props.accessProfile !== null && props.accessProfile.can_manage_membership}
                        locale={props.locale}
                    />
                    :
                    null
                }
                {openTab === 2 ?
                    <LinkageForm
                        id={props.id} collaboratorID={props.id}
                        data={linkage}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setLinkage
                        })}
                        create={linkage === null || linkage === undefined || linkage.id === undefined}
                        returnToMain={() => setOpenTab(0)}
                    />

                    :
                    null
                }

                {openTab === 3 && linkage !== null && linkage !== undefined && linkage.id !== undefined ? (
                        <ProgressionList
                            linkageID={linkage.id} returnToMain={() => setOpenTab(0)}
                            notSearched={props.notSearched}
                            setNotSearched={props.setNotSearched}
                            searchInput={props.searchInput}
                        />
                    )
                    :
                    null

                },
            </div>
        </div>
    )
}

CorporateForms.propTypes = {
    id: PropTypes.any,
    accessProfile: PropTypes.object,
    locale: PropTypes.string,
    lang: PropTypes.object,
    fetchMembership: PropTypes.func,

    notSearched: PropTypes.bool, searchInput: PropTypes.string, setNotSearched: PropTypes.func
}