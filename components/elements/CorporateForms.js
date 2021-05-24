import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import MembershipForm from "../templates/forms/MembershipForm";
import submitMember from "../../utils/submit/SubmitMember";
import CollaborationList from "../templates/list/CollaborationList";
import TabContent from "../templates/TabContent";
import fetchMember from "../../utils/fetch/FetchMember";
import fetchMainCollaboration from "../../utils/fetch/FetchMainCollaboration";
import Alert from "../layout/Alert";

export default function CorporateForms(props) {
    const [member, setMember] = useState(null)
    const [mainCollaboration, setMainCollaboration] = useState(null)
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (props.openTab === 0 && member === null && props.id !== null) {
            setLoading(true)
            fetchMember({memberID: props.id, setStatus: setStatus}).then(res => {

                if(res !== null) {
                    setMember(res.member)
                    fetchMainCollaboration({memberID: res.member.id, setStatus: undefined}).then(res => {
                        if(res !== null)
                            setMainCollaboration({key: res.id, value:res.tag})


                    })
                }
            })
            setLoading(false)
        }
    }, [props.openTab])


    return (
        <div style={{width: '100%', display: 'grid', gap: '16px', alignItems: 'flex-start', justifyItems: 'center'}}>

            <Alert type={'error'} message={status.message} handleClose={() => setStatus({
                error: false,
                message: undefined
            })}
                   render={status.error}/>
            <div style={{width: '100%'}}>
                <TabContent
                    tabs={[
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
                                    create={member === null || member.id === undefined}
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
                    openTab={props.openTab}

                />
            </div>
        </div>
    )
}

CorporateForms.propTypes = {
    id: PropTypes.string,
        accessProfile:PropTypes.object,
        locale:PropTypes.string,
        lang:PropTypes.object,
    openTab: PropTypes.number
}