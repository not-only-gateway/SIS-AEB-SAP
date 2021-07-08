import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import UnitList from "../components/structural/UnitList";
import {RenderTabs, Tabs} from "sis-aeb-misc";
import Head from "next/head";
import StructuralPT from "../packages/locales/structural/StructuralPT";
import EntityList from "../components/structural/EntityList";
import {Header} from "sis-aeb-misc";

export default function structural(props) {

    const router = useRouter()
    const lang = StructuralPT
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
                                value: lang.units,
                                content: <UnitList redirect={id => router.push('/unit/?id=' + id, undefined, {shallow: true})}
                                                   searchInput={props.searchInput} notSearched={props.notSearched}
                                                   setNotSearched={props.setNotSearched} setOpen={setOpenForm}/>
                            },
                            {
                                key: 1,
                                value: lang.entities,
                                content: <EntityList
                                    redirect={id => router.push('/entity/?id=' + id, undefined, {shallow: true})}
                                    setOpen={setOpenForm}

                                    notSearched={props.notSearched}
                                    setNotSearched={props.setNotSearched}
                                    searchInput={props.searchInput}/>
                            }
                        ]}
                        setOpenTab={setOpenTab}
                        openTab={openTab}
                    />
                }
            </div>
        </>


    )

}
