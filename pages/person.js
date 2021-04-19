import React, {useEffect, useState} from 'react'
import {Avatar, createMuiTheme} from "@material-ui/core";
import {useRouter} from "next/router";
import Collaborations from "../components/person/Collaborations";
import {ThemeProvider} from "@material-ui/styles";
import BaseForm from "../components/person/BaseForm";
import ContactForm from "../components/person/ContactForm";
import AddressForm from "../components/shared/form/AddressForm";
import DocumentsForm from "../components/person/DocumentsForm";
import {getLanguage} from "../utils/shared/Language";
import TabLayout from "../components/shared/layout/TabLayout";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import shared from "../styles/shared/Shared.module.css";
import {
    getSecondaryBackground,
    getPrimaryColor,
    getPrimaryBackground,
    getTertiaryColor
} from "../styles/shared/MainStyles";
import styles from '../styles/person/Form.module.css'
import fetchComponentData from "../utils/person/FetchData";
import mainStyles from '../styles/shared/Main.module.css'
import ImageHost from "../utils/shared/ImageHost";
import PersonCard from "../components/index/PersonCard";
import ProfileComponent from "../components/person/Profile";


export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)
    const [create, setCreate] = useState(undefined)

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [dark, setDark] = useState(false)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState({
    })
    const [role, setRole] = useState({})
    const [collaboration, setCollaboration] = useState({})
    const [unit, setUnit] = useState({})
    const [editMode, setEditMode] = useState(false)
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
                    {path: 'main/collaboration/' + router.query.id, params: {}}
                ).then(res => {
                    console.log('res')
                    console.log(res)
                    
                    if (res !== null) {
                        setProfile(res.profile)
                        setCollaboration(res.collaboration)
                        setUnit(res.unit)
                        setRole(res.role)
                    }
                    console.log(res.role)

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

    if (lang !== null && router.isReady && router.query.id === id && !loading && profile !== null)
        return (
            <ThemeProvider theme={createMuiTheme({
                palette: {
                    type: dark ? "dark" : "light"
                }
            })}>
                {/*<GetPageTitle pageName={lang.main.title} pageTitle={lang.main.title}*/}
                {/*              pageInfo={lang.main.info} dark={dark}/>*/}
                {id !== undefined ?
                    <div className={mainStyles.displayColumnSpaced} style={{width: '60.5vw',}}>
                        {create !== 'true' ?
                            <>
                                <div style={{
                                    transform: 'translateY(10vh) translateX(0)', display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between'
                                }}>
                                    <ProfileComponent
                                        profile={profile}
                                        collaboration={collaboration}
                                        unit={unit}
                                        dark={dark}
                                        setEditMode={setEditMode}
                                        editMode={editMode}
                                        role={role}
                                        editable={accessProfile !== null && accessProfile.canUpdatePerson}
                                        inactiveLocale={lang.inactive}/>
                                    {editMode && accessProfile !== null?
                                        <TabLayout
                                            dark={dark}
                                            width={45}

                                            tabs={[
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
                                                },
                                                {
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
                                                },
                                                {
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
                                                },
                                                {
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
                                                },
                                                {
                                                    buttonKey: 5,
                                                    value: (
                                                        <Collaborations
                                                            id={id}
                                                            dark={dark}
                                                            editionMode={accessProfile.canUpdateCollaboration}
                                                            locale={router.locale}
                                                        />
                                                    )

                                                }
                                            ]}
                                            buttons={[
                                                {
                                                    disabled: false,
                                                    key: 1,
                                                    value: 'Basic'
                                                },
                                                {
                                                    disabled: !accessProfile.canViewDocuments,
                                                    key: 2,
                                                    value: 'documents'
                                                },
                                                {
                                                    disabled: !accessProfile.canViewContact,
                                                    key: 3,
                                                    value: 'contact'
                                                },
                                                {
                                                    disabled: !accessProfile.canViewLocation,
                                                    key: 4,
                                                    value: 'address'
                                                },
                                                {
                                                    disabled: !accessProfile.canViewCollaboration,
                                                    key: 5,
                                                    value: 'collaborations'
                                                }
                                            ]}
                                        /> :
                                        <Collaborations
                                            id={id}
                                            dark={dark}
                                            editionMode={false}
                                            locale={router.locale}

                                        />
                                    }
                                </div>

                            </>
                            :
                            null

                        }
                    </div>
                    :
                    null
                }
            </ThemeProvider>
        )
    else
        return <></>
}
