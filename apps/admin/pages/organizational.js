import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import EffectiveRoleList from "../components/organizational/EffectiveRoleList";
import CommissionedRoleList from "../components/organizational/CommissionedRoleList";
import Head from "next/head";
import OrganizationalPT from "../packages/locales/organizational/OrganizationalPT";
import ContractList from "../components/organizational/ContractList";
import AccessProfileList from "../components/organizational/AccessProfileList";
import {Header, Tabs} from "sis-aeb-misc";

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
                <Header title={lang.title} marginTop={true}/>
                {openForm ? null :
                <Tabs
                    buttons={[
                        {
                            key: 0,
                            value: lang.contractTitle,
                            content: <ContractList setOpen={setOpenForm} notSearched={props.notSearched} setNotSearched={props.setNotSearched} searchInput={props.searchInput} />
                        },
                        {
                            key: 1,
                            value: lang.effectiveRoleTitle,
                            content: <EffectiveRoleList setOpen={setOpenForm} notSearched={props.notSearched} setNotSearched={props.setNotSearched} searchInput={props.searchInput} />
                        },
                        {
                            key: 2,
                            value: lang.commissionedRoleTitle,
                            content: <CommissionedRoleList setOpen={setOpenForm} notSearched={props.notSearched} setNotSearched={props.setNotSearched} searchInput={props.searchInput} />
                        },
                        {
                            key: 3,
                            value: lang.access,
                            content: <AccessProfileList setOpen={setOpenForm} notSearched={props.notSearched} setNotSearched={props.setNotSearched} searchInput={props.searchInput} />
                        }
                    ]}
                    setOpenTab={setOpenTab}
                    openTab={openTab}
                />}
            </div>
        </>
    )
}
