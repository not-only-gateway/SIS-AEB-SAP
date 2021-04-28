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
import Collaborations from "../components/elements/collaborations/Collaborations";
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/elements/TabContent";
import Authenticate from "../components/modules/Authenticate";

export default function create() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [profile, setProfile] = useState({})
    const [valid, setValid] = useState(false)

    function handleChange(props) {
        setProfile(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    useEffect(() => {

        if (accessProfile === null)
            readAccessProfile().then(res => {
                if (res === null)
                    router.push('/', '/', {locale: router.locale})
                else
                    setAccessProfile(res)
            })
        setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale, router.isReady, router.query])

    function redirectProfile(new_id) {
        router.push('/person?id=' + new_id, '/person?id=' + new_id, {shallow: true, locale: router.locale})
    }

    if (lang !== null && accessProfile !== null)
        return (
            <>
                <Authenticate valid={valid} setValid={setValid}
                              redirect={() => router.push('/', '/', {locale: router.locale})} locale={router.locale}/>
                <HeaderLayout
                    availableTabs={undefined}
                    filterComponent={undefined}
                    title={
                        lang.title
                    }
                    pageTitle={lang.title}
                    information={lang.information}
                    searchComponent={undefined}
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
                    <div style={{width: '75%', marginTop: '20px'}}>
                        <BaseForm
                            id={undefined}
                            dark={false}
                            profile={profile}
                            handleChange={handleChange}
                            visible={accessProfile.canUpdatePerson}
                            editable={accessProfile.canUpdatePerson}
                            locale={router.locale}
                            redirect={redirectProfile}
                            create={true}
                        />
                    </div>
                </div>
            </>


        )
    else
        return <></>
}
