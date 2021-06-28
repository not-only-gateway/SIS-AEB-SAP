import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import styles from '../styles/Unit.module.css'
import submitUnit from "../utils/submit/SubmitUnit";
import AddressForm from "../components/person/forms/AddressForm";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import submitUnitAddress from "../utils/submit/SubmitUnitAddress";
import UnitPT from "../packages/locales/unit/UnitPT";
import ManagementPT from "../packages/locales/management/ManagementPT";
import Head from "next/head";
import {RenderTabs, Tabs} from "sis-aeb-misc";
import PeopleList from "../components/management/PeopleList";
import ContractualLinkageList from "../components/management/ContractualLinkageList";
import UnitForm from "../components/structural/UnitForm";
import StructuralRequests from "../utils/fetch/StructuralRequests";

export default function unit() {


    const router = useRouter()


    const [accessProfile, setAccessProfile] = useState(null)
    const [openTab, setOpenTab] = useState(0)
    const [openForm, setOpenForm] = useState(false)
    const [id, setId] = useState(undefined)
    const lang = UnitPT
    const [unit, setUnit] = useState({})
    const [unitAddress, setUnitAddress] = useState({})


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
                    <title>{lang.title}</title>
                    <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
                </Head>

                <div style={{width: '65%', margin: 'auto', overflowY: 'hidden'}}>
                    {openForm ? null :
                        <Tabs
                            buttons={[
                                {
                                    key: 0,
                                    value: lang.base
                                },
                                {
                                    key: 1,
                                    value: lang.location
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
                                value: (
                                    <UnitForm handleSubmit={submitUnit} data={unit} locale={router.locale}
                                              handleChange={event => handleObjectChange({
                                                  event: event,
                                                  setData: setUnit
                                              })}/>
                                )
                            },
                            {
                                buttonKey: 1,
                                value: (
                                    <AddressForm data={unit} locale={router.locale}
                                                 id={unit.id} address={unitAddress}
                                                 handleChange={event => handleObjectChange({
                                                     event: event,
                                                     setData: setUnitAddress
                                                 })} handleSubmit={submitUnitAddress}
                                    />
                                )
                            }
                        ]}
                    />
                </div>
            </>


        )
    else
        return <></>
}
