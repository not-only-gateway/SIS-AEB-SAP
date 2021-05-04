import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import fetchComponentData from "../utils/person/FetchData";
import mainStyles from '../styles/shared/Main.module.css'
import Profile from "../components/templates/Profile";

import Collaborations from "../components/modules/Collaborations";
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";
import Authenticate from "../components/modules/Authenticate";
import OverviewComponent from "../components/templates/ProfileOverview";
import BaseForm from "../components/templates/forms/BaseForm";
import DocumentsForm from "../components/templates/forms/DocumentsForm";
import ContactForm from "../components/templates/forms/ContactForm";
import AddressForm from "../components/templates/forms/AddressForm";
import fetchMember from "../utils/fetch/FetchMember";
import fetchCollaboration from "../utils/fetch/FetchCollaboration";

export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

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
        senior: null
    })

    const [editMode, setEditMode] = useState(false)
    const [openTab, setOpenTab] = useState(0)
    const [valid, setValid] = useState(false)

    function handleDocumentsChange(props) {

        setDocuments(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    function handleContactChange(props) {
        setContact(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    function handlePersonChange(props) {

        setPerson(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    function handleMemberChange(props) {

        setMember(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    function handleAddressChange(props) {

        setAddress(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    function handleCollaborationChange(props) {

        setCollaboration(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    useEffect(() => {
            if (router.isReady && router.query.id !== id) {
                setId(router.query.id)
                fetchMember(id).then(res => {
                    if (res !== null) {
                        if (accessProfile === null || (!accessProfile.canUpdatePerson)) {
                            delete res.person.education
                            delete res.person.marital_status
                            delete res.person.mother_name
                            delete res.person.father_name
                            delete res.person.birth_place
                        }
                        setMember(res.member)
                        setPerson(res.person)
                    }
                })
                fetchCollaboration(id).then(res => {
                        if (res !== null) {
                            handleCollaborationChange({name: 'effectiveRole', value: res.effective_role})
                            handleCollaborationChange({name: 'commissionedRole', value: res.commissioned_role})
                            handleCollaborationChange({name: 'unit', value: res.unit})
                            handleCollaborationChange({name: 'linkage', value: res.linkage})
                            handleCollaborationChange({name: 'senior', value: res.senior_member})
                        }
                        setLoading(false)
                    }
                )
            }
            setLang(getLanguage(router.locale, router.pathname))

            if (accessProfile === null)
                readAccessProfile().then(res => setAccessProfile(res))
        },
        [router.locale, router.isReady, router.query]
    )


    if (lang !== null && id !== undefined && !loading)
        return (
            <>
                <Authenticate
                    valid={(valid || !editMode) || (new Cookies()).get('authorization_token') !== undefined}
                    setValid={setValid}
                    redirect={() => {
                        setEditMode(false)
                    }}
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
                                value: 'Documents'
                            } : null,
                            editMode && accessProfile !== null ? {
                                disabled: !accessProfile.canViewContact,
                                key: 3,
                                value: 'Contact'
                            } : null,
                            editMode && accessProfile !== null ? {
                                disabled: !accessProfile.canViewLocation,
                                key: 4,
                                value: 'Address'
                            } : null,
                            (accessProfile !== null && accessProfile.canUpdateCollaboration && editMode) ? {
                                disabled: false,
                                key: 5,
                                value: 'Collaborations'
                            } : null
                        ]

                        ,
                        setOpenTab: setOpenTab,
                        openTab: openTab
                    }}
                    filterComponent={undefined}
                    title={
                        <Profile person={person} dark={false} setEditMode={event => {
                            setEditMode(event)
                            setOpenTab(0)
                        }} editMode={editMode}
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
                                            dark={false}
                                            person={person}
                                            member={member}
                                            collaboration={collaboration}
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
                                                dark={false}
                                                person={person}
                                                handleChange={handlePersonChange}
                                                visible={accessProfile.canUpdatePerson}
                                                editable={accessProfile.canUpdatePerson}
                                                locale={router.locale}
                                            />
                                        )
                                    } : null,
                                editMode && accessProfile !== null ? {
                                    buttonKey: 2,
                                    value: (
                                        <DocumentsForm
                                            id={id}
                                            dark={false}
                                            documents={documents}
                                            handleChange={handleDocumentsChange}
                                            locale={router.locale}
                                            editable={accessProfile.canUpdateDocuments}
                                        />
                                    )
                                } : null,
                                editMode && accessProfile !== null ? {
                                    buttonKey: 3,
                                    value: (
                                        <ContactForm
                                            id={id}
                                            dark={false}
                                            contact={contact}
                                            locale={router.locale}
                                            handleChange={handleContactChange}
                                            editable={accessProfile.canUpdateContact}
                                        />
                                    )
                                } : null,
                                editMode && accessProfile !== null ? {
                                    buttonKey: 4,
                                    value: (
                                        <AddressForm
                                            id={id}
                                            dark={false}
                                            address={address}
                                            handleChange={handleAddressChange}
                                            locale={router.locale}
                                            editable={accessProfile.canUpdateLocation}
                                        />

                                    )
                                } : null,

                                {
                                    buttonKey: 5,
                                    value: (
                                        <Collaborations
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
