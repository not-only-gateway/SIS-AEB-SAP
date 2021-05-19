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
import HorizontalTabs from "../layout/navigation/HorizontalTabs";
import TabContent from "../templates/TabContent";
import fetchMember from "../../utils/fetch/FetchMember";
import fetchMainCollaboration from "../../utils/fetch/FetchMainCollaboration";
import fetchDocuments from "../../utils/fetch/FetchDocuments";
import fetchContacts from "../../utils/fetch/FetchContacts";
import fetchAddress from "../../utils/fetch/FetchAddress";
import fetchPerson from "../../utils/fetch/FetchPerson";
import Alert from "../layout/Alert";

export default function PersonalForms(props) {
    const [openTab, setOpenTab] = useState(0)
    const [documents, setDocuments] = useState(null)
    const [contact, setContact] = useState(null)
    const [address, setAddress] = useState(null)
    const [person, setPerson] = useState(null)
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        switch (true) {
            case openTab === 0 && person === null: {
                fetchPerson(
                    {personID: props.personID, setStatus: setStatus}
                ).then(res => {
                    setPerson(res)
                    setLoading(false)
                })
                break
            }
            case openTab === 1 && documents === null: {
                fetchDocuments(
                    {personID: props.personID, setStatus: setStatus}
                ).then(res => {
                    setDocuments(res)
                    setLoading(false)
                })
                break
            }
            case openTab === 2 && contact === null: {
                fetchContacts(
                    {personID: props.personID, setStatus: setStatus}
                ).then(res => {
                    setContact(res)
                    setLoading(false)
                })
                break
            }
            case openTab === 3 && address === null: {
                fetchAddress(
                    {personID: props.personID, setStatus: setStatus}
                ).then(res => {
                    address(res)
                    setLoading(false)
                })
                break
            }
            default:
                break
        }
    }, [openTab])

    return (
        <div style={{width: '100%', display: 'flex', gap: '16px', alignItems: 'flex-start'}}>
            <Alert type={'error'} message={status.message} handleClose={() => setStatus({
                error: false,
                message: undefined
            })} render={status.error}/>

            <TabContent
                openTab={openTab}
                tabs={[
                    {
                        buttonKey: 0,
                        value: loading || person === null ? null : (
                            <BaseForm
                                id={props.id}
                                person={person}
                                handleChange={event => handleObjectChange({
                                    event: event,
                                    setData: setPerson
                                })}
                                handleSubmit={submitPerson}
                                editable={props.accessProfile.canUpdatePerson}
                                locale={props.locale}
                            />
                        )
                    },
                    {
                        buttonKey: 1,
                        value: loading || documents === null ? null : (
                            <DocumentsForm
                                id={props.id}
                                documents={documents}
                                handleChange={event => handleObjectChange({
                                    event: event,
                                    setData: setDocuments
                                })}
                                handleSubmit={submitDocuments}
                                editable={props.accessProfile.canUpdatePerson}
                                locale={props.locale}
                            />
                        )
                    },
                    {
                        buttonKey: 2,
                        value: loading || contact === null ? null : (
                            <ContactForm
                                id={props.id}
                                contact={contact}
                                locale={props.locale}
                                handleChange={event => handleObjectChange({
                                    event: event,
                                    setData: setContact
                                })}
                                handleSubmit={submitContacts}
                                editable={props.accessProfile.canUpdatePerson}
                            />
                        )
                    },
                    {
                        buttonKey: 3,
                        value: loading || address === null ? null : (
                            <AddressForm
                                id={props.id}
                                dark={false}
                                address={address}
                                handleChange={event => handleObjectChange({
                                    event: event,
                                    setData: setAddress
                                })}
                                handleSubmit={submitAddress}
                                locale={props.locale}
                                editable={props.accessProfile.canUpdatePerson}
                            />
                        )
                    },
                ]}/>

        </div>
    )
}

PersonalForms.propTypes = {
    id: PropTypes.string,
    personID: PropTypes.number,
    locale: PropTypes.string,
    accessProfile: PropTypes.object,
    lang: PropTypes.object
}