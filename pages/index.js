import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Skeleton} from "@material-ui/lab";
import {getLanguage} from "../utils/shared/PageLanguage";
import InfiniteScroll from "react-infinite-scroll-component";
import FetchData from "../utils/extensions/FetchData";
import {getTertiaryColor} from "../styles/shared/MainStyles";
import mainStyles from '../styles/shared/Main.module.css'
import ExtensionsSearch from "../components/elements/ExtensionsSearch";
import ExtensionsList from "../components/templates/ExtensionsList";
import ExtensionsFilters from "../components/modules/filters/ExtensionsFilters";
import HeaderLayout from "../components/layout/HeaderLayout";

export default function Index() {

    const router = useRouter()
    const data = useRef([])
    const [loading, setLoading] = useState(true)
    const [lang, setLang] = useState(null)
    const [option, setOption] = useState('collaborators')
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [maxID, setMaxID] = useState(null)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        setLang(getLanguage(router.locale, '/'))
        if (data.length === 0)
            fetchData(1, true, false).catch(error => console.log(error))
    }, [])

    const [filters, setFilters] = useState({
        unit: undefined,
        effectiveRole: undefined,
        commissionedRole: undefined,
        senior: undefined,
        effectiveRoleOnly: undefined,
        commissionedRoleOnly: undefined,
        changed: false
    })


    async function fetchData(type, start, search) {

        await FetchData({
            setResponse: event => data.current = event,
            params: {
                input: search === false ? null : searchInput.length === 0 ? null : searchInput,
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

    function handleInputChange(event) {
        if (event.length === 0)
            fetchData(1, true, false)
        setSearchInput(event)
    }

    function handleFilterChange(props) {
        setFilters(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    if (lang !== null)
        return (
            <>

                <HeaderLayout tab={
                    undefined
                } filterComponent={
                    <ExtensionsFilters
                        dark={false} setOption={setOption} option={option}
                        lang={lang} setLoading={setLoading} fetchData={fetchData}
                        setMaxID={setMaxID} filters={filters} handleFilterChange={handleFilterChange}
                    />
                } pageTitle={lang.extensions} title={lang.extensions} searchComponent={
                    <ExtensionsSearch
                        dark={false} setData={event => data.current = event}
                        lang={lang.search} setLoading={setLoading} fetchData={fetchData}
                        searchInput={searchInput} setSearchInput={handleInputChange}
                        setMaxID={setMaxID} width={100}
                    />
                }
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
                    {!loading ?
                        data.current.length > 0 ?
                            <div style={{width: '75%'}}>
                                <InfiniteScroll
                                    dataLength={data.current.length}
                                    next={() => fetchData(0)}
                                    hasMore={lastFetchedSize === 15}
                                    inverse={false}
                                    scrollableTarget="scrollableDiv"
                                    loader={<Skeleton variant={'rect'} width={'100%'} style={{borderRadius: '8px'}}
                                                      height={'7vh'}/>}
                                    endMessage={
                                        <div style={{
                                            width: '100%'
                                        }}>
                                            <p className={mainStyles.secondaryParagraph}
                                               style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: false})}}>{lang.end}</p>
                                        </div>
                                    }
                                >

                                    <ExtensionsList data={data.current}

                                                    redirect={id => {
                                                        router.push({
                                                            pathname: '/person',
                                                            query: {id: id}
                                                        })
                                                    }}
                                                    inactiveLocale={lang.inactive}/>
                                </InfiniteScroll>
                            </div>
                            :

                            <div className={mainStyles.displayInlineCenter} style={{
                                ...{marginBottom: '15px', width: '50vw'}
                            }}>
                                <p className={mainStyles.secondaryParagraph}
                                   style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: false})}}>{lang.nothingFound}</p>
                            </div>

                        :
                        <div className={mainStyles.displayInlineCenter} style={{
                            ...{marginBottom: '15px', width: '50vw'}
                        }}>
                            <p className={mainStyles.secondaryParagraph}
                               style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: false})}}>Loading</p>
                        </div>}
                </div>
            </>
        )
    else
        return <></>
}