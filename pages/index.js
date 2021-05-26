import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import fetchExtensions from "../utils/fetch/FerchExtensions";
import SearchBox from "../components/elements/SearchBox";
import styles from '../styles/Extensions.module.css'
import ExtensionsFilters from "../components/modules/filters/ExtensionsFilters";
import HeaderLayout from "../components/layout/HeaderLayout";
import FiltersComponent from "../components/layout/FiltersComponent";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import TabContent from "../components/templates/TabContent";
import Extensions from "../components/modules/Extensions";
import CollaboratorsStructure from "../components/modules/structure/CollaboratorsStructure";
import {Modal} from "@material-ui/core";
import animations from "../styles/shared/Animations.module.css";
import {FilterListRounded} from "@material-ui/icons";
import Button from "../components/modules/inputs/Button";
import HorizontalTabs from "../components/layout/navigation/HorizontalTabs";

export default function Index() {

    const router = useRouter()
    const [data, setData] = useState([])
    const [lang, setLang] = useState(null)
    const [option, setOption] = useState('collaborators')
    const [openTab, setOpenTab] = useState(0)
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [maxID, setMaxID] = useState(null)

    const [filters, setFilters] = useState({
        unit: undefined,
        effectiveRole: undefined,
        commissionedRole: undefined,
        senior: undefined,
        effectiveRoleOnly: undefined,
        commissionedRoleOnly: undefined,
        searchInput: ''
    })
    const [modal, setModal] = useState(false);

    useEffect(() => {
        setLang(getLanguage(router.locale, '/'))
        if (data.length === 0)
            fetchData(1, true, false).catch(error => console.log(error))


    }, [])

    async function fetchData(type, start, search) {

        await fetchExtensions({
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

            path: option,
            setLastFetchedSize: setLastFetchedSize,
            setMaxID: setMaxID,
            data: data,
            type: type
        }).catch(error => console.log(error))
    }

    function renderModal() {

        return (
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}
            >
                <div className={[styles.filterModalContainer, animations.slideInRightAnimation].join(' ')}>
                    <ExtensionsFilters
                        dark={false} setOption={setOption} option={option}
                        setModal={() => setModal(false)}
                        applyChanges={() => {
                            fetchData(1, true)
                        }}
                        setMaxID={setMaxID} filters={filters}
                        handleFilterChange={event => handleObjectChange({event: event, setData: setFilters})}
                        locale={router.locale}
                    />

                </div>

            </Modal>
        )
    }

    if (lang !== null)
        return (
            <div>
                {renderModal()}
                <HeaderLayout
                    width={'75%'}
                    tabs={
                        <HorizontalTabs
                            buttons={[
                                {
                                    disabled: false,
                                    key: 0,
                                    value: lang.list
                                },
                                {
                                    disabled: false,
                                    key: 1,
                                    value: lang.structure
                                },
                            ]}
                            setOpenTab={setOpenTab}
                            openTab={openTab}
                        />
                    }

                    pageTitle={lang.extensions}
                    title={
                        <div style={{display: 'flex', gap: '16px', alignItems: "center", justifyItems: 'flex-start'}}>
                            <h2 style={{
                                marginBottom: "unset",
                                marginTop: "unset",
                            }}>
                                {lang.extensions}
                            </h2>
                            {openTab > 0 ? null :
                                <Button handleClick={() => setModal(true)} boxShadow={false} disabled={false}
                                        hoverHighlight={true}
                                        justification={'center'} content={<FilterListRounded/>} variant={"default"}
                                        backgroundColor={'#f4f5fa'} fontColor={'#262626'} padding={'8px'}
                                        border={' #ecedf2 .7px solid'} width={'fit-content'} colorVariant={'default'}
                                />
                            }
                        </div>
                    }
                    information={openTab === 1 ? lang.information : undefined}
                    searchComponent={
                        openTab === 0 ?
                            <SearchBox searchInput={filters.searchInput}
                                       setSearchInput={event => handleObjectChange({
                                           event: {
                                               name: 'searchInput',
                                               value: event
                                           },
                                           setData: setFilters
                                       })}
                                       applyChanges={() => {
                                           fetchData(1, true)
                                       }}
                                       searchLocale={lang.search}/>
                            :
                            undefined
                    }
                    activeFiltersComponent={
                        openTab > 0 ? null :
                            <FiltersComponent
                                handleChange={event => handleObjectChange({event: event, setData: setFilters})}
                                applyChanges={() => {
                                    fetchData(1, true)
                                }}
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
                                    {key: 'option', value: option === 'member' ? 'All' : null, disabled: true}
                                ]}
                            />
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
                                        redirect={id => router.push({
                                            pathname: '/person',
                                            query: {id: id}
                                        })} data={data} fetchData={fetchData}
                                        nothingFound={lang.nothingFound} end={lang.end}
                                        lastFetchedSize={lastFetchedSize}
                                        locale={router.locale}
                                    />
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

            </div>
        )
    else
        return null
}