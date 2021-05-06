import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import fetchComponentData from "../utils/person/FetchData";
import mainStyles from '../styles/shared/Main.module.css'
import Profile from "../components/templates/Profile";

import CollaborationList from "../components/templates/list/CollaborationList";
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";
import Authenticate from "../components/modules/Authenticate";
import OverviewComponent from "../components/templates/ProfileOverview";
import BaseForm from "../components/templates/forms/BaseForm";
import DocumentsForm from "../components/templates/forms/DocumentsForm";
import ContactForm from "../components/templates/forms/ContactForm";
import AddressForm from "../components/templates/forms/AddressForm";
import fetchMember from "../utils/fetch/FetchMember";
import FetchMainCollaboration from "../utils/fetch/FetchMainCollaboration";
import submitPerson from "../utils/submit/SubmitPerson";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import fetchDocuments from "../utils/fetch/FetchDocuments";
import fetchContacts from "../utils/fetch/FetchContacts";
import fetchAddress from "../utils/fetch/FetchAddress";
import submitContacts from "../utils/submit/SubmitContacts";
import submitAddress from "../utils/submit/SubmitAddress";
import submitDocuments from "../utils/submit/SubmitDocuments";
import MembershipForm from "../components/templates/forms/MembershipForm";
import submitMember from "../utils/submit/SubmitMember";

export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [authenticate, setAuthenticate] = useState(false)
    const [loading, setLoading] = useState(true)

    const [person, setPerson] = useState({})
    const [member, setMember] = useState({})
    const [address, setAddress] = useState({})
    const [contact, setContact] = useState({})
    const [documents, setDocuments] = useState({})

    const [collaboration, setCollaboration] = useState({
        unit: null,
        effectiveRole: null,
        commissionedRole: null,
        linkage: null,
        senior: null,
        data: null
    })

    const [editMode, setEditMode] = useState(false)
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
            if (editMode === false) {
                setDocuments({})
                setContact({})
                setAddress({})
                if (accessProfile === null || (!accessProfile.canUpdatePerson)) {
                    handleObjectChange({event: {name: 'education', value: null}, setData: setPerson})
                    handleObjectChange({event: {name: 'marital_status', value: null}, setData: setPerson})
                    handleObjectChange({event: {name: 'mother_name', value: null}, setData: setPerson})
                    handleObjectChange({event: {name: 'father_name', value: null}, setData: setPerson})
                    handleObjectChange({event: {name: 'birth_place', value: null}, setData: setPerson})
                }
            } else {
                fetchDocuments(person.id).then(res => {
                    if (res !== null)
                        setDocuments(res)
                })
                fetchContacts(person.id).then(res => {
                    if (res !== null)
                        setContact(res)
                })
                fetchAddress(person.id).then(res => {
                    if (res !== null)
                        setAddress(res)
                })
            }
            if (router.isReady && router.query.id !== id) {

                setId(router.query.id)
                fetchMember(router.query.id).then(res => {
                    if (res !== null) {
                        if (accessProfile === null)
                            readAccessProfile().then(profile => {
                                setAccessProfile(profile)
                                if (profile === null || (!profile.canUpdatePerson)) {
                                    console.log('HERE')
                                    delete res.person.education
                                    delete res.person.marital_status
                                    delete res.person.mother_name
                                    delete res.person.father_name
                                    delete res.person.birth_place
                                }
                            })

                        setMember(res.member)
                        setPerson(res.person)
                    }
                })
                FetchMainCollaboration(router.query.id).then(res => {
                        if (res !== null) {
                            handleObjectChange({
                                event: {name: 'effectiveRole', value: res.effective_role},
                                setData: setCollaboration
                            })
                            handleObjectChange({event: {name: 'senior', value: res.senior_member}, setData: setCollaboration})
                            handleObjectChange({event: {name: 'linkage', value: res.linkage}, setData: setCollaboration})
                            handleObjectChange({event: {name: 'unit', value: res.unit}, setData: setCollaboration})
                            handleObjectChange({event: {name: 'data', value: res.collaboration}, setData: setCollaboration})
                            handleObjectChange({
                                event: {name: 'commissionedRole', value: res.commissioned_role},
                                setData: setCollaboration
                            })
                        }
                        setLoading(false)
                    }
                )
            }
            if (lang === null)
                setLang(getLanguage(router.locale, router.pathname))
        },
        [router.locale, router.isReady, router.query, editMode]
    )


    if (lang !== null && id !== undefined && !loading)
        return (
            <>
                <Authenticate
                    redirect={() => {
                        setEditMode(false)
                    }}
                    render={editMode || authenticate}
                    locale={router.locale}
                />
                <HeaderLayout
                    availableTabs={{
                        tabs: [
                            {
                                disabled: false,
                                key: 0,
                                value: 'Overview'
                            },
                            (editMode) && accessProfile !== null ? {
                                disabled: false,
                                key: 1,
                                value: 'Basic'
                            } : null,
                            editMode && accessProfile !== null ? {
                                disabled: !accessProfile.canViewDocuments,
                                key: 2,
                                value: 'Membership'
                            } : null,
                            editMode && accessProfile !== null ? {
                                disabled: !accessProfile.canViewDocuments,
                                key: 3,
                                value: 'Documents'
                            } : null,
                            editMode && accessProfile !== null ? {
                                disabled: !accessProfile.canViewContact,
                                key: 4,
                                value: 'Contact'
                            } : null,
                            editMode && accessProfile !== null ? {
                                disabled: !accessProfile.canViewLocation,
                                key: 5,
                                value: 'Address'
                            } : null,
                            (accessProfile !== null && accessProfile.canUpdateCollaboration && editMode) ? {
                                disabled: false,
                                key: 6,
                                value: 'Collaborations'
                            } : null
                        ]

                        ,
                        setOpenTab: setOpenTab,
                        openTab: openTab
                    }}
                    filterComponent={undefined}
                    title={
                        <Profile
                            person={person}
                            member={member}
                            setEditMode={event => {
                                if (event && (new Cookies()).get('authorization_token') !== undefined)
                                    setEditMode(event)
                                else if(!event)
                                    setEditMode(event)
                                else
                                    setAuthenticate(true)
                                setOpenTab(0)
                            }}
                            editMode={editMode}
                            editable={accessProfile !== null && accessProfile.canUpdatePerson}
                            inactiveLocale={lang.inactive}
                        />
                    }
                    pageTitle={person.name}
                    information={null}
                    searchComponent={undefined}
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
                    <div style={{width: '75%'}}>
                        <TabContent
                            openTab={openTab}
                            tabs={[
                                {
                                    buttonKey: 0,
                                    value: (
                                        <OverviewComponent
                                            person={person}
                                            member={member}
                                            collaboration={collaboration.data}
                                            unit={collaboration.unit}
                                            commissionedRole={collaboration.commissionedRole}
                                            effectiveRole={collaboration.effectiveRole}
                                            senior={collaboration.senior}
                                            linkage={collaboration.linkage}
                                        />
                                    )
                                },
                                (editMode) && accessProfile !== null ?
                                    {
                                        buttonKey: 1,
                                        value: (
                                            <BaseForm
                                                id={id}
                                                person={person}
                                                handleChange={event => handleObjectChange({
                                                    event: event,
                                                    setData: setPerson
                                                })}
                                                handleSubmit={submitPerson}
                                                editable={accessProfile.canUpdatePerson}
                                                locale={router.locale}
                                            />
                                        )
                                    } : null,
                                (editMode) && accessProfile !== null ? {
                                    buttonKey: 2,
                                    value: (
                                        <MembershipForm
                                            id={id}
                                            member={member}
                                            handleChange={event => handleObjectChange({
                                                event: event,
                                                setData: setMember
                                            })}
                                            handleSubmit={submitMember}
                                            editable={accessProfile.canUpdateMembership}
                                            locale={router.locale}
                                        />
                                    )
                                } : null,
                                editMode && accessProfile !== null ? {
                                    buttonKey: 3,
                                    value: (
                                        <DocumentsForm
                                            id={id}
                                            documents={documents}
                                            handleChange={event => handleObjectChange({
                                                event: event,
                                                setData: setDocuments
                                            })}
                                            handleSubmit={submitDocuments}
                                            editable={accessProfile.canUpdateDocuments}
                                            locale={router.locale}
                                        />
                                    )
                                } : null,
                                editMode && accessProfile !== null ? {
                                    buttonKey: 4,
                                    value: (
                                        <ContactForm
                                            id={id}
                                            contact={contact}
                                            locale={router.locale}
                                            handleChange={event => handleObjectChange({
                                                event: event,
                                                setData: setContact
                                            })}
                                            handleSubmit={submitContacts}
                                            editable={accessProfile.canUpdateContact}
                                        />
                                    )
                                } : null,
                                editMode && accessProfile !== null ? {
                                    buttonKey: 5,
                                    value: (
                                        <AddressForm
                                            id={id}
                                            dark={false}
                                            address={address}
                                            handleChange={event => handleObjectChange({
                                                event: event,
                                                setData: setAddress
                                            })}
                                            handleSubmit={submitAddress}
                                            locale={router.locale}
                                            editable={accessProfile.canUpdateLocation}
                                        />

                                    )
                                } : null,

                                {
                                    buttonKey: 6,
                                    value: (
                                        <CollaborationList
                                            id={id}
                                            dark={false}
                                            editionMode={editMode && accessProfile !== null && accessProfile.canUpdateCollaboration}
                                            locale={router.locale}
                                        />
                                    )
                                }
                            ]}/>
                    </div>
                </div>
            </>


        )
    else
        return <></>
}
