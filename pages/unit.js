import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import styles from '../styles/Unit.module.css'
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";
import Authenticate from "../components/modules/Authenticate";
import fetchUnit from "../utils/fetch/FetchUnit";
import fetchExtensions from "../utils/fetch/FerchExtensions";
import Extensions from "../components/modules/Extensions";
import submitUnit from "../utils/submit/SubmitUnit";
import HorizontalTabs from "../components/layout/navigation/HorizontalTabs";
import ExpandableTabs from "../components/layout/navigation/ExpandableTabs";
import Cookies from "universal-cookie/lib";
import AddressForm from "../components/templates/forms/AddressForm";
import PropTypes from "prop-types";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import submitUnitAddress from "../utils/submit/SubmitUnitAddress";
import UnitForm from "../components/templates/forms/UnitForm";

export default function unit() {

    const router = useRouter()
    const [id, setId] = useState(undefined)

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [notAuthenticated, setNotAuthenticate] = useState(false)
    const [loading, setLoading] = useState(true)

    const [unit, setUnit] = useState({})
    const [collaborators, setCollaborators] = useState({})
    const [unitAddress, setUnitAddress] = useState({})

    const [openTab, setOpenTab] = useState({
        mainTab: 0,
        subTab: undefined
    })
    const [maxID, setMaxID] = useState(null)
    const [lastFetchedSize, setLastFetchedSize] = useState(null)

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
            fetchCollaborators()
        }

        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null)
            setAccessProfile(JSON.parse(sessionStorage.getItem('accessProfile')))

        if (lang === null)
            setLang(getLanguage(router.locale, router.pathname))

        setNotAuthenticate(!(new Cookies()).get('authorization_token'))
    })

    async function fetchCollaborators() {
        await fetchExtensions({
            setResponse: setCollaborators,
            params: {
                input: null,
                max_id: maxID,
                unit: router.query.id,
                senior: null,
                effective: null,
                commissioned: null,
                commissioned_role: null,
                effective_role: null
            },
            setLoading: setLoading,
            path: 'collaborators',
            setLastFetchedSize: setLastFetchedSize,
            setMaxID: setMaxID,
            data: undefined,
            type: 1
        }).catch(error => console.log(error))
    }

    if (lang !== null && id !== undefined && !loading)
        return (
            <>
                <Authenticate
                    handleClose={res => {
                        console.log(res)
                        setNotAuthenticate(false)
                    }}
                    forceClose={() => setOpenTab({
                        mainTab: 0,
                        subTab: undefined
                    })}
                    render={openTab.mainTab === 1 && notAuthenticated}
                    locale={router.locale}
                />
                <HeaderLayout
                    width={'75%'}
                    tabs={

                        <ExpandableTabs
                            buttons={[
                                {
                                    mainButton: {
                                        disabled: false,
                                        key: 0,
                                        value: lang.collaborators
                                    },
                                    subButtons: null
                                },
                                accessProfile !== null && accessProfile.can_manage_structure ? {
                                    mainButton: {
                                        disabled: false,
                                        key: 1,
                                        value: lang.edit
                                    },
                                    subButtons: [
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
                                    ]
                                } : null]}
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
                            {/*<Button>Edit</Button>*/}
                        </div>
                    }
                    pageTitle={unit.acronym}
                    information={unit.name}
                    searchComponent={undefined}
                />
                <div className={styles.contentContainer}>
                    <TabContent
                        openTab={openTab.mainTab}
                        tabs={[
                            {
                                buttonKey: 0,
                                value: (
                                    <Extensions
                                        redirect={id => router.push({
                                            pathname: '/person',
                                            query: {id: id}
                                        })} data={collaborators} fetchData={fetchCollaborators}
                                        nothingFound={lang.nothingFound} end={lang.end}
                                        locale={router.locale} lastFetchedSize={lastFetchedSize}/>
                                )
                            },
                            // {
                            //     buttonKey: 1,
                            //     value: (
                            //         <UnitOverview unit={unit} lang={lang}/>
                            //     )
                            // },
                            accessProfile !== null && accessProfile.can_manage_structure ? {
                                buttonKey: 1,
                                value: (openTab.subTab === 0 ?

                                    <UnitForm handleSubmit={submitUnit} data={unit} locale={router.locale}/>
                                    :
                                    <AddressForm data={unit} locale={router.locale}
                                                 id={unit.id} address={unitAddress}
                                                 handleChange={event => handleObjectChange({
                                                     event: event,
                                                     setData: setUnitAddress
                                                 })} handleSubmit={submitUnitAddress}
                                    />)
                            } : null

                        ]}/>
                </div>
            </>


        )
    else
        return <></>
}
