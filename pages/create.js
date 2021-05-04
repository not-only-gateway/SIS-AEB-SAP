import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import mainStyles from '../styles/shared/Main.module.css'
import BaseForm from "../components/templates/forms/BaseForm";

import HeaderLayout from "../components/layout/HeaderLayout";
import Authenticate from "../components/modules/Authenticate";
import TabContent from "../components/templates/TabContent";
import MembershipForm from "../components/templates/forms/MembershipForm";

export default function create() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [profile, setProfile] = useState({})
    const [valid, setValid] = useState(false)
    const [openTab, setOpenTab] = useState(0)
    const [step, setStep] = useState(0)

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
                <Authenticate valid={valid || (new Cookies()).get('authorization_token') !== undefined}
                              setValid={setValid}
                              redirect={() => router.push('/', '/', {locale: router.locale})} locale={router.locale}/>
                <HeaderLayout
                    stepper={{
                        tabs: [
                            {
                                disabled: false,
                                key: 0,
                                value: 'Person',
                                status: 'error',
                            }, {
                                disabled: step === 0,
                                key: 1,
                                value: 'Membership',
                                status:  'error',
                            },
                        ],
                        setOpenTab: setOpenTab,
                        openTab: openTab
                    }}
                    filterComponent={undefined}
                    title={
                        lang.title
                    }
                    pageTitle={lang.title}
                    information={lang.information}
                    searchComponent={undefined}
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
                    <div style={{width: '75%', marginTop: '50px'}}>
                        <TabContent
                            openTab={openTab}
                            tabs={[
                                {
                                    buttonKey: 0,
                                    value: (
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
                                            setNext={() => setStep(step + 1)}
                                        />
                                    )
                                },
                                    {
                                        buttonKey: 1,
                                        value: (
                                            <MembershipForm/>
                                        )
                                    },
                            ]}/>

                    </div>
                </div>
            </>


        )
    else
        return <></>
}
