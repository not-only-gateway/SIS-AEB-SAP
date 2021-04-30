import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import Cookies from "universal-cookie/lib";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";
import ActivityFilterComponent from "../components/modules/filters/ActivityFilters";
import fetchActivityData from "../utils/activity/FetchData";
import {getTertiaryColor} from "../styles/shared/MainStyles";
import mainStyles from "../styles/shared/Main.module.css";
import GetPageTitle from "../utils/shared/GetPageTitle";
import Head from "next/head";
import ActivityList from "../components/templates/ActivityList";
import HeaderLayout from "../components/layout/HeaderLayout";
import ExtensionsFilters from "../components/modules/filters/ExtensionsFilters";
import ExtensionsSearch from "../components/elements/ExtensionsSearch";
import ExtensionsList from "../components/templates/ExtensionsList";
import ActivitySearch from "../components/elements/ActivitySearch";
import {Button} from "@material-ui/core";
import {ArrowUpwardRounded} from "@material-ui/icons";
import ActiveFiltersComponent from "../components/modules/ActiveFiltersComponent";

export default function Activity() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [data, setData] = useState([])
    const [filters, setFilters] = useState({
        method: null,
        startDate: null,
        endDate: null
    })

    const [searchInput, setSearchInput] = useState('')
    const [changed, setChanged] = useState(false)
    const [thisMachine, setThisMachine] = useState(false)
    const [maxID, setMaxID] = useState(null)
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [dark, setDark] = useState(false)
    const [pagesFetched, setPagesFetched] = useState(0)

    function handleChange(props) {
        setFilters(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    function fetch(type) {
        fetchActivityData({
            type: type,
            setLastFetchedSize: setLastFetchedSize,
            setData: setData,
            data: data,
            setMaxID: setMaxID,
            maxID: maxID,
            setError: setError,
            setErrorMessage: setErrorMessage,
            thisMachine: thisMachine,
            startDate: filters.startDate,
            endDate: filters.endDate,
            method: filters.method,
            path: searchInput.length > 0 ? searchInput : null,
            setPagesFetched: setPagesFetched,
            pagesFetched: pagesFetched
        }).catch(error => console.log(error))
    }

    useEffect(() => {
        if (data.length === 0)
            fetch(0)
        setDark((new Cookies()).get('theme') === 0)


        const currentLocale = (new Cookies()).get('lang')

        if (currentLocale !== undefined && currentLocale !== router.locale) {
            router.push('/activity', '/activity', {locale: currentLocale}).catch(r => console.log(r))
            setLang(getLanguage(router.locale, router.pathname))
        } else
            setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale])

    function handleInputChange(event) {
        if (event.length === 0)
            fetch(1)
        setSearchInput(event)
    }

    if (lang !== null)
        return (
            <>
                <HeaderLayout tab={undefined}
                              filterComponent={
                                  <ActivityFilterComponent
                                      lang={lang} filters={filters} handleChange={handleChange}
                                      dark={dark} changed={changed}
                                      setChanged={setChanged} fetch={fetch}
                                      setThisMachine={setThisMachine}
                                      thisMachine={thisMachine} setResponseData={setData}
                                      setLastFetchedSize={setLastFetchedSize}
                                      setMaxID={setMaxID} setPagesFetched={setPagesFetched}

                                  />
                              }
                              pageTitle={lang.title}
                              title={lang.title}
                              information={lang.information}
                              activeFiltersComponent={
                                  <ActiveFiltersComponent
                                      active={changed}
                                      activeFilters={[
                                          {
                                              key: 'method-filter',
                                              value: filters.method !== null ? filters.method : null
                                          },
                                          {
                                              key: 'start-date-filter',
                                              value: filters.startDate !== null ? lang.startDate + ' - ' + new Date(filters.startDate).toLocaleDateString() : null
                                          },
                                          {
                                              key: 'end-date-filter',
                                              value: filters.endDate !== null ?lang.endDate + ' - ' + new Date(filters.endDate).toLocaleDateString()  : null
                                          },
                                          {
                                              key: 'input-filter',
                                              value: searchInput.length > 0 ? searchInput : null
                                          },
                                          {
                                              key: 'this-machine-only-filter',
                                              value: thisMachine ? lang.machine : null
                                          },
                                      ]}/>}
                              searchComponent={<ActivitySearch fetchData={fetch} setSearchInput={handleInputChange}
                                                               searchInput={searchInput} lang={lang.search}/>}
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%', position: 'relative'}}>
                    {data.length > 0 ?
                        <div style={{width: '75%'}}>
                            <InfiniteScroll
                                dataLength={data.length}
                                next={() => fetch(0)}
                                hasMore={lastFetchedSize === 20 && data[data.length - 1].access_log.id > 1}
                                inverse={false}
                                scrollableTarget="scrollableDiv"
                                loader={<Skeleton variant={'rect'} width={'100%'}
                                                  style={{borderRadius: '8px'}}
                                                  height={'7vh'}/>}
                                endMessage={
                                    <div style={{
                                        ...{marginBottom: '15px'}
                                    }}>
                                        <p className={mainStyles.secondaryParagraph}
                                           style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: dark})}}>{lang.end}</p>
                                    </div>
                                }
                            >
                                <ActivityList data={data} pagesFetched={pagesFetched}
                                              lang={lang}/>

                            </InfiniteScroll>
                        </div>
                        :

                        <div className={mainStyles.displayInlineCenter} style={{
                            ...{marginBottom: '15px', width: '50vw'}
                        }}>
                            <p className={mainStyles.secondaryParagraph}
                               style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: dark})}}>{lang.nothingFound}</p>
                        </div>}
                    {/*{document.getElementById("scrollableDiv").scrollTop > 0 ?*/}
                    {/*    <Button style={{*/}
                    {/*        position: 'fixed',*/}
                    {/*        zIndex: 5,*/}
                    {/*        bottom: '10px',*/}
                    {/*        right: '28px',*/}
                    {/*        width: '65px',*/}
                    {/*        height: '65px',*/}
                    {/*        backgroundColor: 'black',*/}
                    {/*        color: 'white'*/}
                    {/*    }}*/}
                    {/*            onClick={() => document.getElementById("scrollableDiv").scrollTo(0, 0)}><ArrowUpwardRounded/></Button> : null}*/}
                </div>
            </>
        )
    else
        return <></>
}
