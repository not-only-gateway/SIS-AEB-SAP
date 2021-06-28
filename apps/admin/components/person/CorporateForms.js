import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import {Alert, RenderTabs} from "sis-aeb-misc";
import styles from "../../styles/Person.module.css";
import OptionRow from "./OptionRow";
import CollaboratorRequests from "../../utils/fetch/MemberRequests";
import MemberSubmitRequests from "../../utils/submit/MemberSubmitRequests";
import ContractualLinkageForm from "../management/ContractualLinkageForm";
import CollaboratorOverview from "./overview/CollaboratorOverview";
import CollaboratorForm from "./forms/CollaboratorForm";
import ContractualLinkageOverview from "./ContractualLinkageOverview";

export default function CorporateForms(props) {
    const [collaborator, setCollaborator] = useState(null)
    const [contractualLinkage, setContractualLinkage] = useState(null)

    const [loading, setLoading] = useState(true)
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        if (collaborator === null && props.id !== null && props.id !== undefined) {
            setLoading(true)
            CollaboratorRequests.fetchCollaborator({id: props.id}).then(res => {
                if (res !== null) {
                    setCollaborator(res.collaborator)
                    setContractualLinkage(res.collaborator.occupancy)
                }
            })
            setLoading(false)
        } else
            setLoading(false)
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

                                    <OptionRow setOption={() => setOpenTab(1)} setHistory={() => setOpenTab(4)}
                                               label={props.lang.collaboration}
                                               modalContent={collaborator === null ? null :
                                                   <CollaboratorOverview data={collaborator}/>}/>
                                    {collaborator === null ? null :
                                        <>
                                            <OptionRow setOption={() => setOpenTab(2)} setHistory={() => setOpenTab(4)}
                                                       label={props.lang.contractualLinkage}
                                                       modalContent={contractualLinkage === null ? null :
                                                           <ContractualLinkageOverview data={contractualLinkage}/>}/>
                                            <OptionRow setOption={() => setOpenTab(3)} setHistory={() => setOpenTab(4)}
                                                       label={props.lang.commissionedLinkages}
                                                       modalContent={null}/>
                                        </>
                                    }
                                    {/*<button className={shared.rowContainer} onClick={() => setOpenTab(2)}*/}
                                    {/*        style={{*/}
                                    {/*            width: '100%',*/}
                                    {/*            justifyContent: "space-between",*/}
                                    {/*            cursor: props.modalContent === null ? 'unset' : 'pointer',*/}
                                    {/*            color: '#282828',*/}
                                    {/*            boxShadow: props.modalContent === null ? 'unset' : undefined*/}
                                    {/*        }}>*/}
                                    {/*    {props.lang.collaborations}*/}
                                    {/*</button>*/}
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
                                    create={contractualLinkage === null || contractualLinkage === undefined}
                                    data={contractualLinkage}
                                    handleChange={event => handleObjectChange({
                                        event: event,
                                        setData: setContractualLinkage
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