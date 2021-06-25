import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import PeopleList from "../components/management/PeopleList";
import ManagementPT from "../packages/locales/management/ManagementPT";
import {RenderTabs, Tabs} from "sis-aeb-misc";
import Head from "next/head";
import ContractualLinkageList from "../components/management/ContractualLinkageList";
import CommissionedLinkageList from "../components/management/CommissionedLinkageList";

export default function management(props) {

    const router = useRouter()
    const lang = ManagementPT
    const [accessProfile, setAccessProfile] = useState(null)
    const [openTab, setOpenTab] = useState(0)
    const [openForm, setOpenForm] = useState(false)

    useEffect(() => {

        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null) {
            const accessProfileSession = JSON.parse(sessionStorage.getItem('accessProfile'))
            if (accessProfileSession.can_manage_person || accessProfileSession.can_manage_structure) {
                setAccessProfile(accessProfileSession)
                setOpenTab(accessProfileSession.can_manage_person ? 0 : 1)
            } else
                router.push('/organizational', '/organizational', {locale: router.locale})
        }
    }, [])


    return (
        <>
            <Head>
                <title>{lang.title}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <div style={{width: '65%', margin: 'auto', overflowY: 'hidden'}}>
                {openForm ? null :
                    <Tabs
                        buttons={[
                            accessProfile !== null && accessProfile.can_manage_person ? {
                                key: 0,
                                value: lang.people
                            } : null,
                            accessProfile !== null && accessProfile.can_manage_structure ? {
                                key: 1,
                                value: lang.commissionedLinkages
                            } : null,
                            accessProfile !== null && accessProfile.can_manage_structure ? {
                                key: 2,
                                value: lang.contractualLinkages
                            } : null
                        ]}
                        setOpenTab={setOpenTab}
                        openTab={openTab}
                    />
                }
                <RenderTabs
                    openTab={openTab}

                    tabs={[
                        {
                            buttonKey: 0,
                            value: <PeopleList notSearched={props.notSearched} setNotSearched={props.setNotSearched}
                                               searchInput={props.searchInput}
                                               redirect={id => router.push('/person/?id=' + id, undefined, {shallow: true})}/>
                        },
                        {
                            buttonKey: 1,
                            value: <CommissionedLinkageList notSearched={props.notSearched} setOpen={setOpenForm}
                                                            setNotSearched={props.setNotSearched}
                                                            searchInput={props.searchInput}/>
                        },
                        {
                            buttonKey: 2,
                            value: <ContractualLinkageList notSearched={props.notSearched} setOpen={setOpenForm}
                                                           setNotSearched={props.setNotSearched}
                                                           searchInput={props.searchInput}/>

                        },
                    ]}
                />
            </div>
        </>


    )

}
