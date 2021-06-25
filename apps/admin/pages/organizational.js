import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import EffectiveRoleList from "../components/organizational/EffectiveRoleList";
import CommissionedRoleList from "../components/organizational/CommissionedRoleList";
import {RenderTabs, Tabs} from "sis-aeb-misc";
import Head from "next/head";
import OrganizationalPT from "../packages/locales/organizational/OrganizationalPT";
import ContractList from "../components/organizational/ContractList";
import AccessProfileList from "../components/organizational/AccessProfileList";

export default function organizational(props) {

    const router = useRouter()
    const lang = OrganizationalPT
    const [accessProfile, setAccessProfile] = useState(null)
    const [openTab, setOpenTab] = useState(0)
    const [openForm, setOpenForm] = useState(false)
    useEffect(() => {
        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null) {
            const accessProfileSession = JSON.parse(sessionStorage.getItem('accessProfile'))
            if (accessProfileSession.can_manage_structure) {
                setAccessProfile(accessProfileSession)
            } else
                router.push('/', '/', {locale: router.locale})

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
                        {
                            key: 0,
                            value: lang.contractTitle
                        },
                        {
                            key: 1,
                            value: lang.effectiveRoleTitle
                        },
                        {
                            key: 2,
                            value: lang.commissionedRoleTitle
                        },
                        {
                            key: 3,
                            value: lang.access
                        }
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
                            value: <ContractList setOpen={setOpenForm} notSearched={props.notSearched} setNotSearched={props.setNotSearched} searchInput={props.searchInput} />
                        },
                        {
                            buttonKey: 1,
                            value: <EffectiveRoleList setOpen={setOpenForm} notSearched={props.notSearched} setNotSearched={props.setNotSearched} searchInput={props.searchInput} />
                        },
                        {
                            buttonKey: 2,
                            value: <CommissionedRoleList setOpen={setOpenForm} notSearched={props.notSearched} setNotSearched={props.setNotSearched} searchInput={props.searchInput} />
                        },
                        {
                            buttonKey: 3,
                            value: <AccessProfileList setOpen={setOpenForm} notSearched={props.notSearched} setNotSearched={props.setNotSearched} searchInput={props.searchInput} />
                        },
                    ]}
                />
            </div>
        </>


    )

}
