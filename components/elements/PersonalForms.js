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
import {ArrowBackRounded, DescriptionRounded, LocationOnRounded, PersonRounded, PhoneRounded} from "@material-ui/icons";
import Button from "../modules/inputs/Button";

export default function PersonalForms(props) {
    const [openTab, setOpenTab] = useState(undefined)
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

        switch (true) {
            case openTab === 0 && person === null: {
                setLoading(true)
                fetchPerson(
                    {personID: props.personID, setStatus: setStatus}
                ).then(res => {
                    setPerson(res)
                    setLoading(false)
                })
                break
            }
            case openTab === 1 && documents === null: {
                setLoading(true)
                fetchDocuments(
                    {personID: props.personID, setStatus: setStatus}
                ).then(res => {
                    setDocuments(res)
                    setLoading(false)
                }).catch(() => setLoading(false))
                break
            }
            case openTab === 2 && contact === null: {
                setLoading(true)
                fetchContacts(
                    {personID: props.personID, setStatus: setStatus}
                ).then(res => {
                    setContact(res)
                    setLoading(false)
                }).catch(() => setLoading(false))
                break
            }
            case openTab === 3 && address === null: {
                setLoading(true)
                fetchAddress(
                    {personID: props.personID, setStatus: setStatus}
                ).then(res => {
                    setAddress(res)
                    setLoading(false)
                }).catch(() => setLoading(false))
                break
            }
            default:
                break
        }
    }, [openTab])

    return (
        <div style={{width: '100%', display: 'grid', gap: '16px', alignItems: 'flex-start', placeItems: 'center'}}>
            <Alert type={'error'} message={status.message} handleClose={() => setStatus({
                error: false,
                message: undefined
            })} render={status.error}/>
            <div style={{width: '100%', display: openTab === undefined ? 'none' : 'initial'}}>
                <Button width={'fit-content'} elevation={false}
                        hoverHighlight={true} border={'#eeeed1 1px solid'} padding={'8px'} fontColor={'#555555'}
                        backgroundColor={'#f4f5fa'}
                        handleClick={() => setOpenTab(undefined)} disabled={false} variant={'rounded'}
                        content={<ArrowBackRounded/>} justification={'center'}/>
            </div>
            <div style={{width: '100%'}}>

                <TabContent
                    openTab={openTab}
                    noContainer={true}
                    tabs={[
                        {
                            buttonKey: undefined,
                            value: (
                                <div style={{width: '100%', display: "grid", gap: '16px'}}>

                                    <Button width={'100%'} hoverHighlight={true} justification={'flex-start'} content={
                                        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                            <PersonRounded/>
                                            <p>Basic</p>
                                        </div>
                                    } variant={'default'} disabled={false}
                                            border={'#ecedf2 .7px solid'} padding={'8px 0  8px 16px'}
                                            fontColor={'#555555'}
                                            backgroundColor={'#f4f5fa'}
                                            handleClick={() => setOpenTab(0)} elevation={true}
                                    />


                                    <Button width={'100%'} hoverHighlight={true} justification={'unset'} content={
                                        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                            <DescriptionRounded/>
                                            <p>Documents</p>
                                        </div>
                                    } variant={'default'} disabled={false}
                                            border={'#ecedf2 .7px solid'} padding={'8px 0  8px 16px'}
                                            fontColor={'#555555'}
                                            backgroundColor={'#f4f5fa'}
                                            handleClick={() => setOpenTab(1)} elevation={true}
                                    />

                                    <Button width={'100%'} hoverHighlight={true} justification={'unset'} content={
                                        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                            <PhoneRounded/>
                                            <p>Contact</p>
                                        </div>
                                    } variant={'default'} disabled={false}
                                            border={'#ecedf2 .7px solid'} padding={'8px 0  8px 16px'}
                                            fontColor={'#555555'}
                                            backgroundColor={'#f4f5fa'}
                                            handleClick={() => setOpenTab(2)} elevation={true}
                                    />


                                    <Button width={'100%'} hoverHighlight={true} justification={'unset'} content={
                                        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                            <LocationOnRounded/>
                                            <p>Address</p>
                                        </div>
                                    } variant={'default'} disabled={false}
                                            border={'#ecedf2 .7px solid'} padding={'8px 0  8px 16px'}
                                            fontColor={'#555555'}
                                            backgroundColor={'#f4f5fa'}
                                            handleClick={() => setOpenTab(3)} elevation={true}
                                    />

                                </div>
                            )
                        },
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
                            value: loading ? null : (
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
                            value: loading ? null : (
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
                        }, {
                            buttonKey: 3,
                            value: loading ? null : (
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