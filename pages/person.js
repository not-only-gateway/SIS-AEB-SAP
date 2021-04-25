import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import Collaborations from "../components/pages/person/collaboration/Collaborations";
import BaseForm from "../components/pages/person/BaseForm";
import ContactForm from "../components/pages/person/ContactForm";
import AddressForm from "../components/shared/AddressForm";
import DocumentsForm from "../components/pages/person/DocumentsForm";
import {getLanguage} from "../utils/shared/Language";
import TabLayout from "../components/layout/TabLayout";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import fetchComponentData from "../utils/person/FetchData";
import mainStyles from '../styles/shared/Main.module.css'
import ProfileComponent from "../components/pages/person/Profile";
import Head from "next/head";
import OverviewComponent from "../components/pages/person/Overview";


export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)
    const [create, setCreate] = useState(undefined)

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [dark, setDark] = useState(false)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState({})
    const [effectiveRole, setEffectiveRole] = useState({})
    const [collaboration, setCollaboration] = useState({})
    const [unit, setUnit] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [senior, setSenior] = useState(null)
    const [commissionedRole, setCommissionedRole] = useState(null)


    function handleChange(props) {

        setProfile(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    useEffect(() => {
        setDark((new Cookies()).get('theme') === 0)
        if (router.isReady && router.query.id !== id) {
            setId(router.query.id)
            setCreate(router.query.create)
            if (router.query.create !== 'true')
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

    }, [router.locale, router.isReady, router.query])

    function redirect(new_id) {
        router.push('/person', '/person', {
            locale: router.locale,
            query: {
                id: new_id
            }
        })
        setCreate(undefined)
        setId(new_id)
    }

    if (lang !== null && router.isReady && router.query.id === id && !loading && profile !== null && profile !== undefined)
        return (
            <div className={mainStyles.displayInlineCenter}>
                <div style={{width: '63vw'}}>


                    {id !== undefined ?
                        <div className={mainStyles.displayColumnSpaced} style={{width: '70vw',}}>
                            {create !== 'true' ?
                                <>
                                    <Head>
                                        <title>{profile.name}</title>
                                    </Head>
                                    <div style={{
                                        transform: 'translateY(5vh) translateX(0)', display: 'grid',
                                        alignItems: 'flex-start',
                                        justifyItems: 'center'
                                    }}>
                                        <ProfileComponent
                                            profile={profile}
                                            dark={dark}
                                            setEditMode={setEditMode}
                                            editMode={editMode}

                                            editable={accessProfile !== null && accessProfile.canUpdatePerson}
                                            inactiveLocale={lang.inactive}/>
                                        <TabLayout
                                            dark={dark}
                                            width={70}

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
                                                        />
                                                    )
                                                },
                                                editMode && accessProfile !== null ?
                                                    {
                                                        buttonKey: 1,
                                                        value: (
                                                            <BaseForm
                                                                id={id}
                                                                dark={dark}
                                                                profile={profile}
                                                                handleChange={handleChange}
                                                                visible={accessProfile.canUpdatePerson}
                                                                editable={accessProfile.canUpdatePerson}
                                                                locale={router.locale}
                                                                redirect={redirect}
                                                                create={accessProfile.canCreatePerson && create !== undefined}
                                                            />
                                                        )
                                                    } : null,
                                                editMode && accessProfile !== null ? {
                                                    buttonKey: 2,
                                                    value: (
                                                        <DocumentsForm
                                                            id={id}
                                                            dark={dark}
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
                                                            dark={dark}
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
                                                            dark={dark}
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
                                                            dark={dark}
                                                            editionMode={editMode && accessProfile !== null && accessProfile.canUpdateCollaboration}
                                                            locale={router.locale}
                                                        />
                                                    )
                                                }
                                            ]}
                                            buttons={[
                                                !editMode ? {
                                                    disabled: false,
                                                    key: 0,
                                                    value: 'Overview'
                                                } : null,
                                                editMode && accessProfile !== null ? {
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
                                                {
                                                    disabled: false,
                                                    key: 5,
                                                    value: 'Collaborations'
                                                }
                                            ]}
                                        />
                                    </div>

                                </>
                                :
                                null
                            }
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        )
    else
        return <></>
}
