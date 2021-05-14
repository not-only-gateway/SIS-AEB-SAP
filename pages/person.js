import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import styles from '../styles/Person.module.css'
import Profile from "../components/templates/Profile";
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";
import Authenticate from "../components/modules/Authenticate";
import OverviewComponent from "../components/templates/ProfileOverview";
import fetchMember from "../utils/fetch/FetchMember";

import handleObjectChange from "../utils/shared/HandleObjectChange";
import fetchDocuments from "../utils/fetch/FetchDocuments";
import fetchContacts from "../utils/fetch/FetchContacts";
import fetchAddress from "../utils/fetch/FetchAddress";
import PersonalForms from "../components/elements/PersonalForms";
import CorporateForms from "../components/elements/CorporateForms";
import Alert from "../components/layout/Alert";

export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [notAuthenticated, setNotAuthenticated] = useState(true)
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
    const [status, setStatus] = useState({
        error: false,
        message: undefined
    })
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
                fetchMember({memberID: router.query.id, setStatus: setStatus}).then(res => {

                    if (res !== null) {
                        if (accessProfile === null)
                            readAccessProfile().then(profile => {
                                setAccessProfile(profile)
                                if (profile === null || (!profile.canUpdatePerson)) {
                                    delete res.person.education
                                    delete res.person.marital_status
                                    delete res.person.mother_name
                                    delete res.person.father_name
                                    delete res.person.birth_place
                                }
                            })
                        if (res.main_collaboration !== null) {
                            handleObjectChange({
                                event: {name: 'effectiveRole', value: res.effective_role},
                                setData: setCollaboration
                            })
                            handleObjectChange({
                                event: {name: 'senior', value: res.main_collaboration.senior_member},
                                setData: setCollaboration
                            })
                            handleObjectChange({
                                event: {name: 'linkage', value: res.main_collaboration.linkage},
                                setData: setCollaboration
                            })
                            handleObjectChange({
                                event: {name: 'unit', value: res.main_collaboration.unit},
                                setData: setCollaboration
                            })
                            handleObjectChange({
                                event: {name: 'data', value: res.main_collaboration.data},
                                setData: setCollaboration
                            })
                            handleObjectChange({
                                event: {name: 'commissionedRole', value: res.main_collaboration.commissioned_role},
                                setData: setCollaboration
                            })
                            handleObjectChange({
                                event: {name: 'accessProfile', value: res.main_collaboration.access_profile_denomination},
                                setData: setCollaboration
                            })

                        }
                        setMember(res.member)
                        setLoading(false)
                        setPerson(res.person)
                    }
                })
            }
            if (lang === null)
                setLang(getLanguage(router.locale, router.pathname))
            setNotAuthenticated(!(new Cookies()).get('authorization_token'))
        },
        [router.locale, router.isReady, router.query, notAuthenticated, editMode]
    )


    if (lang !== null && id !== undefined)
        return (
            <>

                <Alert type={'error'} message={status.message} handleClose={() => setStatus({
                    error: false,
                    message: undefined
                })} duration={5000} render={status.error}/>
                {!loading ?
                    <>
                        <Authenticate
                            handleClose={valid => {
                                if (valid)
                                    setNotAuthenticated(false)
                                setEditMode(true)
                            }}
                            forceClose={() => setEditMode(false)}
                            render={editMode && notAuthenticated}
                            locale={router.locale}
                        />
                        <HeaderLayout
                            width={'75%'}
                            availableTabs={{
                                tabs: [
                                    {
                                        disabled: false,
                                        key: 0,
                                        value: lang.overview
                                    },
                                    (editMode) && accessProfile !== null ? {
                                        disabled: false,
                                        key: 1,
                                        value: lang.personal
                                    } : null,
                                    editMode && accessProfile !== null ? {
                                        disabled: !accessProfile.canManageMembership,
                                        key: 2,
                                        value: lang.corporate
                                    } : null,
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
                                    notAuthenticate={notAuthenticated}
                                    lang={lang}
                                    setEditMode={event => {
                                        if (!notAuthenticated) {
                                            setEditMode(event)
                                            setOpenTab(0)
                                        } else
                                            setEditMode(event)
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
                        <div className={styles.contentContainer}>

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
                                                <PersonalForms
                                                    lang={lang}
                                                    accessProfile={accessProfile} id={id} setPerson={setPerson}
                                                    contact={contact} setContact={setContact}
                                                    locale={router.locale} documents={documents}
                                                    setDocuments={setDocuments} person={person}
                                                    address={address} setAddress={setAddress}
                                                />
                                            )
                                        } : null,
                                    (editMode) && accessProfile !== null ? {
                                        buttonKey: 2,
                                        value: (
                                            <CorporateForms
                                                lang={lang}
                                                mainCollaboration={collaboration.data !== null && collaboration.data ?
                                                    {
                                                        key: collaboration.data.id,
                                                        value: collaboration.unit.acronym + ' - ' + collaboration.accessProfile,
                                                    } : member.main_collaboration !== null && member.main_collaboration ? {
                                                        value: member.main_collaboration.value,
                                                        key: member.main_collaboration.key,

                                                    } : null}
                                                locale={router.locale} id={id} accessProfile={accessProfile}
                                                member={member} setMember={setMember}/>
                                        )
                                    } : null

                                ]}/>
                        </div>
                    </>
                    :
                    null
                }
            </>


        )
    else
        return <></>
}
