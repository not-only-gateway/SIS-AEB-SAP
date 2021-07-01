import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ContactForm from "./forms/ContactForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import DocumentsForm from "./forms/DocumentsForm";
import BaseForm from "./forms/BaseForm";
import styles from '../../styles/Person.module.css'

import shared from '../../styles/Shared.module.css'
import {Alert, RenderTabs} from "sis-aeb-misc";
import PersonRequests from "../../utils/fetch/PersonRequests";
import AddressForm from "../shared/AddressForm";
import {AddRounded} from "@material-ui/icons";

export default function PersonalForms(props) {
    const [documents, setDocuments] = useState(null)
    const [contact, setContact] = useState(null)
    const [address, setAddress] = useState(null)
    const [person, setPerson] = useState(null)
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })

    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        if (person === null && props.id !== undefined)
            PersonRequests.fetchPerson(
                {personID: props.id, setStatus: setStatus}
            ).then(res => {
                setPerson(res)

            })
        if (documents === null && props.id !== undefined)
            PersonRequests.fetchDocuments(
                {personID: props.id}
            ).then(res => {
                setDocuments(res)

            })
        if (contact === null && props.id !== undefined)
            PersonRequests.fetchContacts(
                {personID: props.id}
            ).then(res => {
                setContact(res)

            })
        if (address === null && props.id !== undefined)
            PersonRequests.fetchAddress(
                {personID: props.id}
            ).then(res => {
                setAddress(res)

            })

    }, [openTab, props.id])

    return (
        <div style={{width: '100%', display: 'grid', gap: '16px', alignItems: 'flex-start', placeItems: 'center'}}>
            <Alert type={'error'} message={status.message} handleClose={() => setStatus({
                error: false,
                message: undefined
            })} render={status.error} rootElementID={'root'}/>

            <div style={{width: '100%'}}>
                <RenderTabs
                    tabsKey={'person'}
                    openTab={openTab}
                    noContainer={true}
                    tabs={[
                        {
                            buttonKey: 0,
                            value: (
                                <div className={styles.personOptionsContainer}>
                                    <button className={shared.buttonContainer} onClick={() => setOpenTab(1)}>

                                        {props.lang.personal}
                                    </button>
                                    <button className={shared.buttonContainer} onClick={() => setOpenTab(2)}>
                                        <AddRounded style={{display: documents === null || documents.person === undefined ? undefined : 'none'}}/>
                                        {props.lang.documents}
                                    </button>
                                    <button className={shared.buttonContainer} onClick={() => setOpenTab(3)}>
                                        <AddRounded style={{display: contact === null || contact.person === undefined ? undefined : 'none'}}/>
                                        {props.lang.contacts}
                                    </button>
                                    <button className={shared.buttonContainer} onClick={() => setOpenTab(4)}>
                                        <AddRounded style={{display: address === null || address.person === undefined ? undefined : 'none'}}/>
                                        {props.lang.address}
                                    </button>
                                </div>
                            )
                        }, {
                            buttonKey: 1,
                            value: (
                                <BaseForm
                                    returnToMain={() =>
                                        setOpenTab(0)
                                    }
                                    id={props.id}
                                    data={person}
                                    handleChange={event => handleObjectChange({
                                        event: event,
                                        setData: setPerson
                                    })}
                                    editable={true}

                                />
                            )
                        },
                        {
                            buttonKey: 2,
                            value: (
                                <DocumentsForm
                                    id={props.id}

                                    data={documents}
                                    handleChange={event => handleObjectChange({
                                        event: event,
                                        setData: setDocuments
                                    })}
                                    editable={true}
                                    returnToMain={() =>
                                        setOpenTab(0)
                                    }
                                />
                            )
                        },
                        {
                            buttonKey: 3,
                            value: (
                                <ContactForm
                                    id={props.id}
                                    data={contact}
                                    returnToMain={() =>
                                        setOpenTab(0)
                                    }
                                    handleChange={event => handleObjectChange({
                                        event: event,
                                        setData: setContact
                                    })}

                                    editable={true}
                                />
                            )
                        }, {
                            buttonKey: 4,
                            value: (
                                <AddressForm
                                    id={props.id}
                                    type={'person'}
                                    data={address}
                                    handleChange={event => handleObjectChange({
                                        event: event,
                                        setData: setAddress
                                    })}
                                    create={address === null || address.person === undefined}
                                    returnToMain={() =>
                                        setOpenTab(0)
                                    }
                                    editable={true}
                                />
                            )
                        }
                    ]}/>
            </div>
        </div>
    )
}

PersonalForms.propTypes = {
    id: PropTypes.any,
    accessProfile: PropTypes.object,
    lang: PropTypes.object
}