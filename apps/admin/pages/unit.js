import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import styles from '../styles/Unit.module.css'
import UnitPT from "../packages/locales/unit/UnitPT";
import Head from "next/head";
import {RenderTabs, Tabs} from "sis-aeb-misc";
import StructuralRequests from "../utils/fetch/StructuralRequests";
import UnitVacancies from "../components/unit/UnitVacancies";
import UnitForms from "../components/unit/UnitForms";

export default function unit(props) {


    const router = useRouter()


    const [accessProfile, setAccessProfile] = useState(null)
    const [openTab, setOpenTab] = useState(0)
    const [openForm, setOpenForm] = useState(false)
    const [id, setId] = useState(undefined)
    const lang = UnitPT
    const [unit, setUnit] = useState({})


    useEffect(() => {
        if (id === undefined && router.query.id !== undefined) {
            setId(router.query.id)
            StructuralRequests.fetchUnit(router.query.id).then(res => setUnit(res))
        }

        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null) {
            const accessProfileSession = JSON.parse(sessionStorage.getItem('accessProfile'))
            if (accessProfileSession.can_manage_structure) {
                setAccessProfile(accessProfileSession)
                setOpenTab(accessProfileSession.can_manage_person ? 0 : 1)
            } else
                router.push('/structure', '/structure', {locale: router.locale})
        }
    }, [router.query])


    if (id !== undefined)
        return (
            <>
                <Head>
                    <title>{unit.acronym}</title>
                    <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
                </Head>

                <div className={styles.pageContainer}>
                    <div className={styles.unitHeader}>
                        <div className={styles.unitInfoHeader}>
                            <div style={{
                                fontSize: '1.6rem',
                                color: '#333333',
                                textTransform: 'capitalize'
                            }}>
                                {unit.name}
                            </div>
                            <div style={{
                                fontSize: '.9rem',
                                color: '#555555'
                            }}>
                                {unit.acronym}
                            </div>
                        </div>

                    </div>

                    <div className={styles.unitContentContainer}>
                        {openForm ? null :
                            <Tabs
                                buttons={[
                                    {
                                        key: 0,
                                        value: lang.vacancies,
                                        content: <UnitVacancies
                                            id={id} search={props.searchInput} unit={unit}
                                            applySearch={props.notSearched} setOpen={setOpenForm}
                                            setApplySearch={props.setNotSearched}
                                        />,

                                    },
                                    {
                                        key: 1,
                                        value: lang.forms,
                                        content: <UnitForms id={id}/>,
                                    }
                                ]}
                                setOpenTab={setOpenTab}
                                openTab={openTab}
                            />
                        }
                    </div>
                </div>
            </>


        )
    else
        return <></>
}
