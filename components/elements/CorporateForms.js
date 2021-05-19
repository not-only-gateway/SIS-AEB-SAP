import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import mainStyles from '../../styles/shared/Main.module.css'
import VerticalTabs from "../layout/navigation/VerticalTabs";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import MembershipForm from "../templates/forms/MembershipForm";
import submitMember from "../../utils/submit/SubmitMember";
import CollaborationList from "../templates/list/CollaborationList";
import TabContent from "../templates/TabContent";
import fetchMember from "../../utils/fetch/FetchMember";
import fetchMainCollaboration from "../../utils/fetch/FetchMainCollaboration";
import Alert from "../layout/Alert";
import Button from "../modules/inputs/Button";
import {ArrowBackRounded, AssignmentIndRounded, ExtensionRounded, PersonRounded} from "@material-ui/icons";

export default function CorporateForms(props) {
    const [member, setMember] = useState(null)
    const [mainCollaboration, setMainCollaboration] = useState(null)
    const [openTab, setOpenTab] = useState(undefined)
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })
    const [loading, setLoading] = useState(true)
    const [returnPosition, setReturnPosition] = useState(null)

    useEffect(() => {
        if (returnPosition === null || returnPosition === 0) {
            setReturnPosition(window.scrollY + document.getElementById('return-corporate-form').getBoundingClientRect().top)
        }
        if (openTab === 0 && member === null) {
            setLoading(true)
            fetchMember({memberID: props.id, setStatus: setStatus}).then(res => {
                setMember(res.member)

            })
            fetchMainCollaboration({memberID: props.id, setStatus: setStatus}).then(res => {
                setMainCollaboration(res.member)
                setLoading(false)
            })
        }
    }, [openTab])


    return (
        <div style={{width: '100%', display: 'grid', gap: '16px', alignItems: 'flex-start', justifyItems: 'center'}}>

            <div id={'return-corporate-form'}
                 style={{
                     width: '100%',
                     display: openTab === undefined ? 'none' : 'initial',
                     position: "sticky",
                     top: returnPosition + 'px',
                     backgroundColor: 'green'
                 }}>
                <Button width={'fit-content'} elevation={false}
                        hoverHighlight={true} border={'#eeeed1 1px solid'} padding={'8px'} fontColor={'#555555'}
                        backgroundColor={'#f4f5fa'}
                        handleClick={() => setOpenTab(undefined)} disabled={false} variant={'rounded'}
                        content={<ArrowBackRounded/>} justification={'center'}/>
            </div>
            <Alert type={'error'} message={status.message} handleClose={() => setStatus({
                error: false,
                message: undefined
            })}
                   render={status.error}/>
            <div style={{width: '100%'}}>
                <TabContent
                    tabs={[
                        {
                            buttonKey: undefined,
                            value: (
                                <div style={{width: '100%', display: "grid", gap: '16px'}}>
                                    <Button width={'100%'} hoverHighlight={true} justification={'flex-start'} content={
                                        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                            <ExtensionRounded/>
                                            <p>Member</p>
                                        </div>
                                    } variant={'default'} disabled={false}
                                            border={'#ecedf2 .7px solid'} padding={'8px 0  8px 16px'}
                                            fontColor={'#555555'}
                                            backgroundColor={'#f4f5fa'}
                                            handleClick={() => setOpenTab(0)} elevation={true}
                                    />
                                    <Button width={'100%'} hoverHighlight={true} justification={'flex-start'} content={
                                        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                            <AssignmentIndRounded/>
                                            <p>Collaborations</p>
                                        </div>
                                    } variant={'default'} disabled={false}
                                            border={'#ecedf2 .7px solid'} padding={'8px 0  8px 16px'}
                                            fontColor={'#555555'}
                                            backgroundColor={'#f4f5fa'}
                                            handleClick={() => setOpenTab(1)} elevation={true}
                                    />
                                </div>
                            )
                        },
                        {
                            buttonKey: 0,
                            value: loading ? null : (
                                <MembershipForm
                                    id={props.id}
                                    member={member}
                                    handleChange={event => handleObjectChange({
                                        event: event,
                                        setData: setMember
                                    })}
                                    mainCollaboration={mainCollaboration}
                                    handleSubmit={submitMember}
                                    create={member === null}
                                    editable={props.accessProfile.canManageMembership}
                                    locale={props.locale}
                                />
                            )
                        },
                        {
                            buttonKey: 1,
                            value: (
                                <CollaborationList
                                    id={props.id}
                                    dark={false}
                                    editionMode={props.accessProfile.canManageMembership}
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

CorporateForms.propTypes =
{
    id: PropTypes.string,


        accessProfile
:
    PropTypes.object,
        locale
:
    PropTypes.string,
        lang
:
    PropTypes.object,
}