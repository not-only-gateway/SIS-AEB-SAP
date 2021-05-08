import React from "react";
import PropTypes from "prop-types";
import mainStyles from '../../styles/shared/Main.module.css'
import VerticalTabs from "../layout/navigation/VerticalTabs";
import ContactForm from "../templates/forms/ContactForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import submitContacts from "../../utils/submit/SubmitContacts";
import DocumentsForm from "../templates/forms/DocumentsForm";
import submitDocuments from "../../utils/submit/SubmitDocuments";
import submitPerson from "../../utils/submit/SubmitPerson";
import BaseForm from "../templates/forms/BaseForm";
import MembershipForm from "../templates/forms/MembershipForm";
import submitMember from "../../utils/submit/SubmitMember";
import CollaborationList from "../templates/list/CollaborationList";

export default function CorporateForms(props) {
    return (
        <div className={mainStyles.displayWarp} style={{width: '100%'}}>
            <VerticalTabs
                buttons={[
                    {
                        disabled: false,
                        key: 0,
                        value: 'Membership'
                    },
                    {
                        disabled: false,
                        key: 1,
                        value: 'Collaborations'
                    }
                ]}

                tabs={[
                    {
                        key: 0,
                        content: (
                            <MembershipForm
                                id={props.id}
                                member={props.member}
                                handleChange={event => handleObjectChange({
                                    event: event,
                                    setData: props.setMember
                                })}
                                handleSubmit={submitMember}
                                editable={props.accessProfile.canUpdateMembership}
                                locale={props.locale}
                            />
                        )
                    },
                    {
                        key: 1,
                        content:(
                            <CollaborationList
                                id={props.id}
                                dark={false}
                                editionMode={props.accessProfile.canUpdateCollaboration}
                                locale={props.locale}
                            />
                        )
                    }
                ]}
            />


        </div>
    )
}

CorporateForms.propTypes = {
    id: PropTypes.string,
    member: PropTypes.object,
    setMember: PropTypes.func,
    accessProfile:PropTypes.object,
    locale: PropTypes.string,

}