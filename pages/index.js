import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import FetchData from "../utils/fetch/FerchExtensions";
import SearchBox from "../components/elements/SearchBox";
import styles from '../styles/Extensions.module.css'
import ExtensionsFilters from "../components/modules/filters/ExtensionsFilters";
import HeaderLayout from "../components/layout/HeaderLayout";
import FiltersComponent from "../components/layout/FiltersComponent";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import TabContent from "../components/templates/TabContent";
import Extensions from "../components/modules/Extensions";
import CollaboratorsStructure from "../components/modules/CollaboratorsStructure";

export default function Index() {

    const router = useRouter()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [lang, setLang] = useState(null)
    const [option, setOption] = useState('collaborators')
    const [openTab, setOpenTab] = useState(0)
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [maxID, setMaxID] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [changed, setChanged] = useState(false)
    const [filters, setFilters] = useState({
        unit: undefined,
        effectiveRole: undefined,
        commissionedRole: undefined,
        senior: undefined,
        effectiveRoleOnly: undefined,
        commissionedRoleOnly: undefined,
        searchInput: ''
    })

    useEffect(() => {
        setLang(getLanguage(router.locale, '/'))
        if (data.length === 0)
            fetchData(1, true, false).catch(error => console.log(error))
        if (accessProfile === null)
            readAccessProfile().then(profile => {
                setAccessProfile(profile)
            })
    }, [])

    function redirect(id) {
        router.push({
            pathname: '/person',
            query: {id: id}
        })
    }

    async function fetchData(type, start, search) {

        await FetchData({
            setResponse: setData,
            params: {
                input: search === false ? null : filters.searchInput.length === 0 ? null : filters.searchInput,
                max_id: start ? null : maxID,
                unit: filters.unit === undefined ? null : filters.unit.key,
                senior: filters.senior === undefined ? null : filters.senior.key,
                effective: filters.effectiveRoleOnly,
                commissioned: filters.commissionedRoleOnly,
                commissioned_role: filters.commissionedRole === undefined ? null : filters.commissionedRole.key,
                effective_role: filters.effectiveRole === undefined ? null : filters.effectiveRole.key,
            },
            setLoading: setLoading,
            option: option,
            setLastFetchedSize: setLastFetchedSize,
            setMaxID: setMaxID,
            data: data,
            type: type
        }).catch(error => console.log(error))
    }

    if (lang !== null)
        return (
            <>

                <HeaderLayout
                    width={'75%'}
                    availableTabs={{
                        tabs: [
                            {
                                disabled: false,
                                key: 0,
                                value: 'Overview'
                            },
                            {
                                disabled: false,
                                key: 1,
                                value: 'Structure'
                            },
                        ],
                        setOpenTab: setOpenTab,
                        openTab: openTab
                    }}
                    filterComponent={
                        openTab === 0 ?
                            <ExtensionsFilters
                                dark={false} setOption={setOption} option={option} setChanged={setChanged}
                                lang={lang} setLoading={setLoading} fetchData={fetchData} changed={changed}
                                setMaxID={setMaxID} filters={filters}
                                handleFilterChange={event => handleObjectChange({event: event, setData: setFilters})}
                                accessProfile={accessProfile}
                            />
                            :
                            undefined
                    }
                    pageTitle={lang.extensions}
                    title={lang.extensions}
                    information={openTab === 1 ? lang.information : undefined}
                    searchComponent={
                        openTab === 0 ?
                            <SearchBox searchInput={filters.searchInput}
                                       setSearchInput={event => handleObjectChange({
                                           event: {
                                               name: 'searchInput',
                                               value: event
                                           }, setData: setFilters
                                       })}
                                       searchLocale={lang.search} setChanged={setChanged}/>
                            :
                            undefined
                    }
                    activeFiltersComponent={
                        openTab === 0 ?
                            <FiltersComponent
                                active={changed}
                                handleChange={event => handleObjectChange({event: event, setData: setFilters})}
                                applyChanges={() => {
                                    setChanged(false)
                                    fetchData(1, true)

                                }}
                                setChanged={setChanged}
                                changed={changed}
                                activeFilters={[
                                    {
                                        key: 'unit',
                                        value: filters.unit !== undefined ? filters.unit.value : null
                                    },
                                    {
                                        key: 'commissionedRole',
                                        value: filters.commissionedRole !== undefined ? filters.commissionedRole.value : null
                                    },
                                    {
                                        key: 'effectiveRole',
                                        value: filters.effectiveRole !== undefined ? filters.effectiveRole.value : null
                                    },
                                    {
                                        key: 'effectiveRoleOnly',
                                        value: filters.effectiveRoleOnly !== undefined && filters.effectiveRoleOnly ? 'Effective Roles Only' : null
                                    },
                                    {
                                        key: 'commissionedRoleOnly',
                                        value: filters.commissionedRoleOnly !== undefined && filters.commissionedRoleOnly ? 'Commissioned Roles Only' : null
                                    },
                                    {
                                        key: 'searchInput',
                                        value: filters.searchInput.length > 0 ? filters.searchInput : null,
                                        type: 'text'
                                    },
                                    {key: 'option', value: option === 'member' ? 'All' : null, disabled: true}
                                ]}/>
                            : undefined
                    }

                />
                <div className={styles.contentContainer}>
                    <TabContent
                        openTab={openTab}
                        tabs={[
                            {
                                buttonKey: 0,
                                value: (
                                    <Extensions
                                        redirect={redirect} data={data} fetchData={fetchData}
                                        nothingFound={lang.nothingFound} end={lang.end}
                                        inactive={lang.inactive} lastFetchedSize={lastFetchedSize}/>
                                )
                            },

                            {
                                buttonKey: 1,
                                value: (
                                    <CollaboratorsStructure/>
                                )
                            }
                        ]}/>
                </div>

            </>
        )
    else
        return null
}