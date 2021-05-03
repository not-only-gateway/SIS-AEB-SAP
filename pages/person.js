import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import fetchComponentData from "../utils/person/FetchData";
import mainStyles from '../styles/shared/Main.module.css'
import Head from "next/head";
import Profile from "../components/elements/profile/Profile";
import Tabs from "../components/layout/TabsComponent.js";
import OverviewComponent from "../components/elements/profile/ProfileOverview";
import BaseForm from "../components/modules/forms/BaseForm";
import DocumentsForm from "../components/modules/forms/DocumentsForm";
import ContactForm from "../components/modules/forms/ContactForm";
import AddressForm from "../components/modules/forms/AddressForm";
import Collaborations from "../components/templates/Collaborations";
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/elements/TabContent";
import Authenticate from "../components/modules/Authenticate";

export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState({})
    const [effectiveRole, setEffectiveRole] = useState({})
    const [collaboration, setCollaboration] = useState({})
    const [unit, setUnit] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [senior, setSenior] = useState(null)
    const [commissionedRole, setCommissionedRole] = useState(null)
    const [openTab, setOpenTab] = useState(0)
    const [linkage, setLinkage] = useState(null)
    const [valid, setValid] = useState(false)

    function handleChange(props) {

        setProfile(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    useEffect(() => {
            if (router.isReady && router.query.id !== id) {
                setId(router.query.id)
                fetchComponentData(
                    {path: 'person/' + router.query.id, params: {}}
                ).then(res => {
                    if (res !== null) {
                        setProfile(res.profile)
                        setCollaboration(res.collaboration)
                        setUnit(res.unit)
                        setEffectiveRole(res.effective_role)
                        setCommissionedRole(res.commissioned_role)
                        setSenior(res.senior)
                        setLinkage(res.linkage)
                    }

                    if (accessProfile === null || (!accessProfile.canUpdatePerson)) {
                        delete profile.education
                        delete profile.marital_status
                        delete profile.mother_name
                        delete profile.father_name
                        delete profile.birth_place
                    }

                    setLoading(false)
                })
            }


            setLang(getLanguage(router.locale, router.pathname))

            if (accessProfile === null)
                readAccessProfile().then(res => setAccessProfile(res))

        }
        ,
        [router.locale, router.isReady, router.query]
    )


    if (lang !== null && id !== undefined && !loading && profile !== null && profile !== undefined)
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
                        <Profile profile={profile} dark={false} setEditMode={event => {
                            setEditMode(event)
                            fetchComponentData(
                                {path: 'person/' + router.query.id, params: {}}
                            ).then(res => {
                                console.log(res)
                                if (res !== null)
                                    setProfile(res.profile)
                            })
                            setOpenTab(0)
                        }} editMode={editMode}
                                 editable={accessProfile !== null && accessProfile.canUpdatePerson}
                                 inactiveLocale={lang.inactive}
                        />
                    }
                    pageTitle={profile.name}
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
                                            profile={profile}
                                            collaboration={collaboration}
                                            unit={unit}
                                            commissionedRole={commissionedRole}
                                            effectiveRole={effectiveRole}
                                            senior={senior}
                                            linkage={linkage}
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
                                                profile={profile}
                                                handleChange={handleChange}
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
                                            locale={router.locale}
                                            visible={accessProfile.canViewDocuments}
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
                                            locale={router.locale}
                                            visible={accessProfile.canViewContact}
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
                                            locale={router.locale}
                                            visible={accessProfile.canViewLocation}
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
