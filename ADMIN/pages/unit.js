import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import styles from '../styles/Unit.module.css'
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";
import fetchUnit from "../utils/fetch/FetchUnit";
import submitUnit from "../utils/submit/SubmitUnit";
import AddressForm from "../components/person/forms/AddressForm";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import submitUnitAddress from "../utils/submit/SubmitUnitAddress";
import UnitForm from "../components/management/forms/UnitForm";
import UnitPT from "../packages/locales/unit/UnitPT";
import HorizontalTabs from "../components/layout/navigation/HorizontalTabs";

export default function unit() {

    const router = useRouter()
    const [id, setId] = useState(undefined)
    const lang = UnitPT
    const [accessProfile, setAccessProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [unit, setUnit] = useState({})
    const [unitAddress, setUnitAddress] = useState({})
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {

        if (router.isReady && id === undefined) {
            setId(router.query.id)
            fetchUnit(router.query.id).then(res => {
                if (res !== null) {
                    setUnit(res)
                    setLoading(false)
                    setUnitAddress(res.address)
                }
            })
        }

        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null)
            setAccessProfile(JSON.parse(sessionStorage.getItem('accessProfile')))

        if (lang === null)
            setLang(getLanguage(router.locale, router.pathname))
    })

    if ( id !== undefined && !loading)
        return (
            <>

                <HeaderLayout
                    width={'75%'}
                    tabs={

                        <HorizontalTabs
                            buttons={[
                                {
                                    disabled: false,
                                    key: 0,
                                    value: lang.base
                                },
                                {
                                    disabled: false,
                                    key: 1,
                                    value: lang.location
                                }
                            ]}
                            setOpenTab={setOpenTab}
                            openTab={openTab}
                        />
                    }
                    filterComponent={undefined}
                    title={
                        <div className={styles.titleContainer}>
                            <h2 style={{
                                marginBottom: 0,
                            }}>
                                {unit.acronym}
                            </h2>
                        </div>
                    }
                    pageTitle={unit.acronym}
                    information={unit.name}
                    searchComponent={undefined}
                />
                <div className={styles.contentContainer}>
                    {accessProfile !== null && accessProfile.can_manage_structure ?
                        <TabContent
                            openTab={openTab.mainTab}
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

                            ]}/>
                        :
                        null
                    }
                </div>
            </>
        )
    else
        return <></>
}
