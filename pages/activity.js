import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/Language";
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
            startDate: filters.date,
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
                                      setChanged={setChanged}
                                      setThisMachine={setThisMachine}
                                      thisMachine={thisMachine} setResponseData={setData}
                                      setLastFetchedSize={setLastFetchedSize}
                                      setMaxID={setMaxID} setPagesFetched={setPagesFetched}

                                  />
                              }
                              pageTitle={lang.title}
                              title={lang.title}
                              information={lang.information}
                              searchComponent={<ActivitySearch fetchData={fetch} setSearchInput={handleInputChange}
                                                               searchInput={searchInput} lang={lang.search}/>}
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
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
                </div>
            </>
        )
    else
        return <></>
}
