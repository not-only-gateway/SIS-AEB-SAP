import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import styles from '../styles/Unit.module.css'
import Profile from "../components/templates/Profile";
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";
import Authenticate from "../components/modules/Authenticate";
import fetchUnit from "../utils/fetch/FetchUnit";
import fetchExtensions from "../utils/fetch/FerchExtensions";
import Extensions from "../components/modules/Extensions";
import UnitOverview from "../components/templates/UnitOverview";

export default function unit() {

    const router = useRouter()
    const [id, setId] = useState(undefined)

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [authenticate, setAuthenticate] = useState(false)
    const [loading, setLoading] = useState(true)

    const [unit, setUnit] = useState({})
    const [collaborators, setCollaborators] = useState({})

    const [editMode, setEditMode] = useState(false)
    const [openTab, setOpenTab] = useState(0)
    const [maxID, setMaxID] = useState(null)
    const [lastFetchedSize, setLastFetchedSize] = useState(null)

    useEffect(() => {

            if (router.isReady) {
                setId(router.query.id)
                fetchUnit(router.query.id).then(res => {
                    if (res !== null) {
                        setUnit(res)
                        setLoading(false)
                    }
                })
                fetchCollaborators()

            }
            if (accessProfile === null)
                readAccessProfile().then(res => setAccessProfile(res))
            if (lang === null)
                setLang(getLanguage(router.locale, router.pathname))
        },
        [router.locale, router.isReady, router.query]
    )

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
                    handleClose={() => setAuthenticate(false)}
                    render={editMode || authenticate}
                    locale={router.locale}
                />
                <HeaderLayout
                    width={'75%'}
                    availableTabs={{
                        tabs: [
                            {
                                disabled: false,
                                key: 0,
                                value: lang.collaborators
                            },
                            {
                                disabled: false,
                                key: 1,
                                value: lang.overview
                            },
                            editMode && accessProfile !== null && accessProfile.canManageStructure ? {
                                disabled: !accessProfile.canViewDocuments,
                                key: 2,
                                value: 'Edit'
                            } : null,
                        ],
                        setOpenTab: setOpenTab,
                        openTab: openTab
                    }}
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
                        openTab={openTab}
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

                            {
                                buttonKey: 1,
                                value: (
                                    <UnitOverview unit={unit} lang={lang}/>
                                )
                            },
                            (editMode) && accessProfile !== null && accessProfile.canManageStructure ? {
                                buttonKey: 2,
                                value: (
                                    'edit mode'
                                )
                            } : null

                        ]}/>
                </div>
            </>


        )
    else
        return <></>
}
