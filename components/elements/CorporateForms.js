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

export default function CorporateForms(props) {
    const [member, setMember] = useState(null)
    const [mainCollaboration, setMainCollaboration] = useState(null)
    const [openTab, setOpenTab] = useState(0)
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        if(openTab === 0) {
            fetchMember({memberID: props.id, setStatus: setStatus}).then(res => {
                setMember(res.member)

            })
            fetchMainCollaboration({memberID: props.id, setStatus: setStatus}).then(res => {
                setMainCollaboration(res.member)
                setLoading(false)
            })
        }
    }, [])


        return (
            <div className={mainStyles.displayWarp} style={{width: '100%'}}>
                <Alert type={'error'} message={status.message} handleClose={() => setStatus({
                    error: false,
                    message: undefined
                })}
                       render={status.error}/>

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
                                    editable={props.accessProfile.canManageMembership}
                                    locale={props.locale}
                                />
                            )
                        },
                        {
                            buttonKey: 1,
                            value:(
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
        )
}

CorporateForms.propTypes = {
    id: PropTypes.string,


    accessProfile:PropTypes.object,
    locale: PropTypes.string,
    lang: PropTypes.object,
}