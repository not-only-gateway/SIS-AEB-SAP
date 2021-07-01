import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import {RenderTabs} from "sis-aeb-misc";
import styles from "../../styles/Person.module.css";
import CollaboratorRequests from "../../utils/fetch/MemberRequests";
import MemberSubmitRequests from "../../utils/submit/MemberSubmitRequests";
import ContractualLinkageForm from "../management/ContractualLinkageForm";

import CollaboratorForm from "./forms/CollaboratorForm";

import CommissionedLinkageForm from "../management/CommissionedLinkageForm";
import shared from "../../styles/Shared.module.css";
import {AddRounded} from "@material-ui/icons";


export default function CorporateForms(props) {
    const [collaborator, setCollaborator] = useState(null)
    const [contractualLinkage, setContractualLinkage] = useState(null)
    const [commissionedLinkage, setCommissionedLinkage] = useState(null)

    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        if (collaborator === null && props.id !== null && props.id !== undefined)
            CollaboratorRequests.fetchCollaborator({id: props.id}).then(res => {
                if (res !== null) {
                    setCollaborator(res)
                    setContractualLinkage(res.occupancy)
                    setCommissionedLinkage(res.main_commissioned_linkage)
                }
            })
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

                <RenderTabs
                    tabsKey={'corporate'}
                    tabs={[
                        {
                            buttonKey: 0,
                            value: (
                                <div className={styles.personOptionsContainer}>

                                    <button className={shared.buttonContainer} onClick={() => setOpenTab(1)}>

                                        {props.lang.collaborator}
                                    </button>
                                    {collaborator === null ? null :
                                        <>
                                            {contractualLinkage === null ? null :
                                                <button className={shared.buttonContainer}
                                                        onClick={() => setOpenTab(2)}>
                                                    {props.lang.contractualLinkage}
                                                </button>
                                            }
                                            {commissionedLinkage === null ? null :
                                                <button className={shared.buttonContainer}
                                                        onClick={() => setOpenTab(3)}>
                                                    {props.lang.commissionedLinkages}
                                                </button>
                                            }
                                        </>
                                    }

                                </div>
                            )
                        },
                        {
                            buttonKey: 1,
                            value: (

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
                            )
                        },
                        {
                            buttonKey: 2,
                            value: (
                                <ContractualLinkageForm
                                    create={false}
                                    data={contractualLinkage}
                                    handleChange={event => handleObjectChange({
                                        event: event,
                                        setData: setContractualLinkage
                                    })}
                                    closeModal={() => setOpenTab(0)}/>
                            )
                        },
                        {
                            buttonKey: 3,
                            value: (
                                <CommissionedLinkageForm
                                    create={false}
                                    data={commissionedLinkage}
                                    handleChange={event => handleObjectChange({
                                        event: event,
                                        setData: setCommissionedLinkage
                                    })}
                                    closeModal={() => setOpenTab(0)}/>
                            )
                        }
                    ]}
                    openTab={openTab}

                />
            </div>
        </div>
    )
}

CorporateForms.propTypes = {
    id: PropTypes.any,
    accessProfile: PropTypes.object,
    locale: PropTypes.string,
    lang: PropTypes.object,
    fetchMembership: PropTypes.func
}