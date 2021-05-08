import React, {useEffect, useState} from "react";
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
import AddressForm from "../templates/forms/AddressForm";
import submitAddress from "../../utils/submit/SubmitAddress";

export default function PersonalForms(props) {

    return (
        <div className={mainStyles.displayWarp} style={{width: '100%'}}>
            <VerticalTabs
                buttons={[
                    {
                        disabled: false,
                        key: 0,
                        value: 'General'
                    },
                    {
                        disabled: false,
                        key: 1,
                        value: 'Documents'
                    },
                    {
                        disabled: false,
                        key: 2,
                        value: 'Contacts'
                    },
                    {
                        disabled: false,
                        key: 3,
                        value: 'Address'
                    },
                ]}

                tabs={[
                    {
                        key: 0,
                        content: (
                            <BaseForm
                                id={props.id}
                                person={props.person}
                                handleChange={event => handleObjectChange({
                                    event: event,
                                    setData: props.setPerson
                                })}
                                handleSubmit={submitPerson}
                                editable={props.accessProfile.canUpdatePerson}
                                locale={props.locale}
                            />
                        )
                    },
                    {
                        key: 1,
                        content:(
                            <DocumentsForm
                                id={props.id}
                                documents={props.documents}
                                handleChange={event => handleObjectChange({
                                    event: event,
                                    setData: props.setDocuments
                                })}
                                handleSubmit={submitDocuments}
                                editable={props.accessProfile.canUpdateDocuments}
                                locale={props.locale}
                            />
                        )
                    },
                    {
                        key: 2,
                        content: (
                            <ContactForm
                                id={props.id}
                                contact={props.contact}
                                locale={props.locale}
                                handleChange={event => handleObjectChange({
                                    event: event,
                                    setData: props.setContact
                                })}
                                handleSubmit={submitContacts}
                                editable={props.accessProfile.canUpdateContact}
                            />
                        )
                    },
                    {
                        key: 3,
                        content: (
                            <AddressForm
                                id={props.id}
                                dark={false}
                                address={props.address}
                                handleChange={event => handleObjectChange({
                                    event: event,
                                    setData: props.setAddress
                                })}
                                handleSubmit={submitAddress}
                                locale={props.locale}
                                editable={props.accessProfile.canUpdateLocation}
                            />
                        )
                    },
                ]}
            />


        </div>
    )
}

PersonalForms.propTypes = {
    id: PropTypes.string,
    setPerson: PropTypes.func,
    locale: PropTypes.string,
    accessProfile: PropTypes.object,
    setDocuments: PropTypes.func,
    setContact: PropTypes.func,
    contact: PropTypes.object,
    documents: PropTypes.object,
    person: PropTypes.object,
    address: PropTypes.object,
    setAddress: PropTypes.func
}