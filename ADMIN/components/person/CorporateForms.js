import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import MembershipForm from "./forms/MembershipForm";
import submitMember from "../../utils/submit/SubmitMember";
import CollaborationList from "../templates/list/CollaborationList";
import TabContent from "../templates/TabContent";
import fetchMember from "../../utils/fetch/FetchMember";
import fetchMainCollaboration from "../../utils/fetch/FetchMainCollaboration";
import Alert from "../layout/Alert";
import fetchMemberByPerson from "../../utils/fetch/FetchMemberByPerson";
import styles from "../../styles/Person.module.css";
import OptionRow from "./OptionRow";
import PersonOverview from "./overview/PersonOverview";
import DocumentsOverview from "./overview/DocumentsOverview";
import ContactsOverview from "./overview/ContactsOverview";
import AddressOverview from "./overview/AddressOverview";
import shared from "../../styles/shared/Shared.module.css";
import {ArrowBackRounded} from "@material-ui/icons";
import MemberOverview from "./overview/MemberOverview";

export default function CorporateForms(props) {
    const [member, setMember] = useState(null)
    const [mainCollaboration, setMainCollaboration] = useState(null)
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })
    const [loading, setLoading] = useState(true)
    const [openTab, setOpenTab] = useState(0)
    useEffect(() => {
        if (member === null && props.id !== null && props.id !== undefined) {
            setLoading(true)
            fetchMember({memberID: props.id, setStatus: setStatus}).then(res => {
                if (res !== null) {
                    setMember(res.member)
                    fetchMainCollaboration({memberID: res.member.id, setStatus: undefined}).then(res => {
                        if (res !== null)
                            setMainCollaboration({key: res.id, value: res.tag})
                    })
                }
            })
            setLoading(false)
        } else
            setLoading(false)
    }, [props.openTab])

    async function handleMemberSubmit(event) {
        let response = false
        if (member === null || member.id === undefined) {
            const submitMemberResponse = await submitMember(event)
            if (submitMemberResponse.status) {
                const fetchMemberResponse = await fetchMemberByPerson({personID: props.personID, setStatus: setStatus})
                if (fetchMemberResponse !== null) {
                    setMember(fetchMemberResponse.member)
                    const mainCollaborationResponse = await fetchMainCollaboration({
                        memberID: fetchMemberResponse.member.id,
                        setStatus: undefined
                    })
                    if (mainCollaborationResponse !== null)
                        setMainCollaboration({key: mainCollaborationResponse.id, value: mainCollaborationResponse.tag})
                }
                props.fetchMembership()
                response = submitMemberResponse
            }
        } else {
            response = await submitMember(event)
        }

        return response
    }

    return (
        <div style={{width: '100%', display: 'grid', gap: '16px', alignItems: 'flex-start', justifyItems: 'center'}}>

            <Alert type={'error'} message={status.message} handleClose={() => setStatus({
                error: false,
                message: undefined
            })}
                   render={status.error}/>
            <div style={{width: '100%'}}>
                <button className={shared.rowContainer} onClick={() => setOpenTab(0)} style={{display: openTab !== 0 ? undefined : 'none', marginBottom: '32px', gap: '16px'}}>
                    <ArrowBackRounded/>
                    <p style={{fontSize: '.9rem'}}>{props.lang.returnLabel}</p>
                </button>
                <TabContent
                    tabs={[
                        {
                            buttonKey: 0,
                            value: (
                                <div className={styles.personOptionsContainer}>
                                    <OptionRow setOption={() => setOpenTab(1)} label={props.lang.membership}
                                               modalContent={member === null ? null : <MemberOverview data={member}/>}/>
                                    <button className={shared.rowContainer} onClick={() => setOpenTab(2)}
                                            style={{
                                                width: '100%',
                                                justifyContent: "space-between",
                                                cursor: props.modalContent === null ? 'unset' : 'pointer',
                                                color: '#282828',
                                                boxShadow: props.modalContent === null ? 'unset' : undefined
                                            }}>
                                        {props.lang.collaborations}
                                    </button>
                                </div>
                            )
                        },
                        {
                            buttonKey: 1,
                            value: loading ? null : (
                                <MembershipForm
                                    personID={props.personID}
                                    memberID={props.id}
                                    member={member}
                                    handleChange={event => handleObjectChange({
                                        event: event,
                                        setData: setMember
                                    })}
                                    mainCollaboration={mainCollaboration}
                                    handleSubmit={handleMemberSubmit}
                                    create={member === null || member.id === undefined}
                                    editable={props.accessProfile !== null && props.accessProfile.can_manage_membership}
                                    locale={props.locale}
                                />
                            )
                        },
                        {
                            buttonKey: 2,
                            value: (
                                <CollaborationList
                                    id={props.id}
                                    dark={false}
                                    editionMode={props.accessProfile !== null && props.accessProfile.can_manage_membership}
                                    locale={props.locale}
                                />
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
    id: PropTypes.string,
    accessProfile: PropTypes.object,
    locale: PropTypes.string,
    lang: PropTypes.object,

    personID: PropTypes.number,
    fetchMembership: PropTypes.func

}