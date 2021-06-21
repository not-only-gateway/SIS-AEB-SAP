import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ContactForm from "./forms/ContactForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import submitContacts from "../../utils/submit/SubmitContacts";
import DocumentsForm from "./forms/DocumentsForm";
import submitDocuments from "../../utils/submit/SubmitDocuments";
import submitPerson from "../../utils/submit/SubmitPerson";
import BaseForm from "./forms/BaseForm";
import AddressForm from "./forms/AddressForm";
// import submitAddress from "../../utils/submit/SubmitAddress";
// import TabContent from "../shared/TabContent";
// import fetchDocuments from "../../utils/fetch/FetchDocuments";
// import fetchContacts from "../../utils/fetch/FetchContacts";
// import fetchAddress from "../../utils/fetch/FetchAddress";
// import fetchPerson from "../../utils/fetch/FetchPerson";
// import Alert from "../../../../packages/alert/src/components/Alert";
import shared from '../../styles/shared/Shared.module.css'
import styles from '../../styles/Person.module.css'
import {ArrowBackRounded} from "@material-ui/icons";
import OptionRow from "./OptionRow";
import AddressOverview from "./overview/AddressOverview";
import ContactsOverview from "./overview/ContactsOverview";
import DocumentsOverview from "./overview/DocumentsOverview";
import PersonOverview from "./overview/PersonOverview";
import PersonHistory from "./history/PersonHistory";

export default function PersonalForms(props) {
    const [documents, setDocuments] = useState(null)
    const [contact, setContact] = useState(null)
    const [address, setAddress] = useState(null)
    const [person, setPerson] = useState(null)
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })
    const [loading, setLoading] = useState(true)
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        fetchPerson(
            {personID: props.personID, setStatus: setStatus}
        ).then(res => {
            setPerson(res)
            setLoading(false)
        })

        fetchDocuments(
            {personID: props.personID}
        ).then(res => {
            setDocuments(res)
            setLoading(false)
        }).catch(() => setLoading(false))

        fetchContacts(
            {personID: props.personID}
        ).then(res => {
            setContact(res)
            setLoading(false)
        }).catch(() => setLoading(false))
        fetchAddress(
            {personID: props.personID}
        ).then(res => {
            setAddress(res)
            setLoading(false)
        }).catch(() => setLoading(false))

    }, [openTab])

    return (
        <div style={{width: '100%', display: 'grid', gap: '16px', alignItems: 'flex-start', placeItems: 'center'}}>
            <Alert type={'error'} message={status.message} handleClose={() => setStatus({
                error: false,
                message: undefined
            })} render={status.error}/>

            <div style={{width: '100%'}}>
                <button className={shared.rowContainer} onClick={() => setOpenTab(0)}
                        style={{display: openTab !== 0 ? undefined : 'none', marginBottom: '32px', gap: '16px'}}>
                    <ArrowBackRounded/>
                    <p style={{fontSize: '.9rem'}}>{props.lang.returnLabel}</p>
                </button>
                <TabContent
                    openTab={openTab}
                    noContainer={true}
                    tabs={[
                        {
                            buttonKey: 0,
                            value: (
                                <div className={styles.personOptionsContainer}>
                                    <OptionRow setOption={() => setOpenTab(1)} setHistory={() => setOpenTab(5)}
                                               label={props.lang.personal}
                                               modalContent={person === null ? null : <PersonOverview data={person}/>}/>
                                    <OptionRow setOption={() => setOpenTab(2)} setHistory={() => setOpenTab(6)}
                                               label={props.lang.documents}
                                               modalContent={documents === null ? null :
                                                   <DocumentsOverview data={documents}/>}/>
                                    <OptionRow setOption={() => setOpenTab(3)} setHistory={() => setOpenTab(7)}
                                               label={props.lang.contacts}
                                               modalContent={contact === null ? null :
                                                   <ContactsOverview data={contact}/>}/>
                                    <OptionRow setOption={() => setOpenTab(4)} label={props.lang.address}
                                               modalContent={address === null ? null :
                                                   <AddressOverview data={address}/>}/>
                                </div>
                            )
                        }, {
                            buttonKey: 1,
                            value: loading || person === null ? null : (
                                <BaseForm
                                    id={props.personID}
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
                            buttonKey: 2,
                            value: loading ? null : (
                                <DocumentsForm
                                    id={props.personID}
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
                            buttonKey: 3,
                            value: loading ? null : (
                                <ContactForm
                                    id={props.personID}
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
                        }, {
                            buttonKey: 4,
                            value: loading ? null : (
                                <AddressForm
                                    id={props.personID}
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
                        {
                            buttonKey: 5,
                            value: (
                                <PersonHistory id={props.personID}/>
                            )
                        },
                        {
                            buttonKey: 6,
                            value: (
                                null
                            )
                        },
                        {
                            buttonKey: 7,
                            value: (
                                null
                            )
                        },
                    ]}/>
            </div>
        </div>
    )
}

PersonalForms.propTypes = {
        id: PropTypes.string,
        personID: PropTypes.number,
        memberID: PropTypes.number,
        locale: PropTypes.string,
        accessProfile: PropTypes.object,
        lang: PropTypes.object
    }