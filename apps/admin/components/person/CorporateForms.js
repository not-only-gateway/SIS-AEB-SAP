import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import MembershipForm from "./forms/MembershipForm";
import CollaborationList from "../management/CollaborationList";
import {Alert, RenderTabs} from "sis-aeb-misc";
import styles from "../../styles/Person.module.css";
import OptionRow from "./OptionRow";
import shared from "../../styles/Shared.module.css";
import {ArrowBackRounded} from "@material-ui/icons";
import MemberOverview from "./overview/MemberOverview";
import MemberRequests from "../../utils/fetch/MemberRequests";
import MemberSubmitRequests from "../../utils/submit/MemberSubmitRequests";

export default function CorporateForms(props) {
    const [member, setMember] = useState(null)
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })
    const [loading, setLoading] = useState(true)
    const [openTab, setOpenTab] = useState(0)
    useEffect(() => {
        if (member === null && props.id !== null && props.id !== undefined) {
            setLoading(true)
            MemberRequests.fetchMember({memberID: props.id, setStatus: setStatus}).then(res => {
                if (res !== null)
                    setMember(res.member)
            })
            setLoading(false)
        } else
            setLoading(false)
    }, [props])

    async function handleMemberSubmit(event) {
        let response = false
        if (member === null || member.person === undefined) {
            event.person = props.id
            MemberSubmitRequests.submitMember(event).then(() => props.fetchMembership())
        } else {
            response = await MemberSubmitRequests.submitMember(event)
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

                <RenderTabs
                    tabsKey={'corporate'}
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
                                    id={props.id}
                                    member={member}
                                    handleChange={event => handleObjectChange({
                                        event: event,
                                        setData: setMember
                                    })}
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
                                null
                                // <CollaborationList
                                //     id={props.id}
                                //     dark={false}
                                //     editionMode={props.accessProfile !== null && props.accessProfile.can_manage_membership}
                                //     locale={props.locale}
                                // />
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