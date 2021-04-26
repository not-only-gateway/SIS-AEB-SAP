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
import ListLayout from "../components/layout/list/ListLayout";
import Head from "next/head";
import ActivityList from "../components/templates/ActivityList";

export default function Activity() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [data, setData] = useState([])
    const [filters, setFilters] = useState({
        method: null,
        path: '',
        startDate: null,
        endDate: null
    })
    const [changed, setChanged] = useState(false)
    const [thisMachine, setThisMachine] = useState(false)
    const [maxID, setMaxID] = useState(null)
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [dark, setDark] = useState(false)
    const [pagesFetched, setPagesFetched] = useState(0)
    const [sorterMethod, setSorterMethod] = useState(undefined)

    function handleChange(props) {
        setFilters(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    function handleSorterChange(event) {
        if (event === sorterMethod)
            setSorterMethod(undefined)
        else
            setSorterMethod(event)
    }

    useEffect(() => {
        setDark((new Cookies()).get('theme') === 0)
        fetchActivityData({
            type: 1,
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
            path: filters.path,
            setPagesFetched: setPagesFetched,
            pagesFetched: pagesFetched
        }).catch(error => console.log(error))

        const currentLocale = (new Cookies()).get('lang')

        if (currentLocale !== undefined && currentLocale !== router.locale) {
            router.push('/activity', '/activity', {locale: currentLocale}).catch(r => console.log(r))
            setLang(getLanguage(router.locale, router.pathname))
        } else
            setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale])

    if (lang !== null)
        return (
            <>
            <Head>
                <title>{lang.title}</title>
            </Head>
            <ListLayout
                columns={[
                    {label: 'ID', key: 'id'},
                    {label: lang.method, key: undefined},
                    {label: 'Path', key: undefined},
                    {label: 'CREATION', key: 'creation'},
                ]}
                title={
                    lang.title
                }
                content={
                    data.length > 0 ?
                        <InfiniteScroll
                            dataLength={data.length}
                            next={() => fetchActivityData({
                                type: 0,
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
                                path: filters.path,
                                setPagesFetched: setPagesFetched,
                                pagesFetched: pagesFetched
                            }).catch(error => console.log(error))}
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
                            <ActivityList data={data} sorterMethod={sorterMethod} pagesFetched={pagesFetched}
                                                  lang={lang}/>

                        </InfiniteScroll>

                        :

                        <div className={mainStyles.displayInlineCenter} style={{
                            ...{marginBottom: '15px', width: '50vw'}
                        }}>
                            <p className={mainStyles.secondaryParagraph}
                               style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: dark})}}>{lang.nothingFound}</p>
                        </div>
                }
                filterComponent={
                    <ActivityFilterComponent lang={lang} filters={filters} handleChange={handleChange}
                                             dark={dark} changed={changed}
                                             setChanged={setChanged}
                                             setThisMachine={setThisMachine}
                                             thisMachine={thisMachine} setResponseData={setData}
                                             setLastFetchedSize={setLastFetchedSize}
                                             setMaxID={setMaxID} setPagesFetched={setPagesFetched}

                    />

                }
                width={88}
                columnWidth={45}
                handleSorterChange={handleSorterChange}
                currentSorter={sorterMethod}
            />
            </>
        )
    else
        return <></>
}
