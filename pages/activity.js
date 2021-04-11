import Layout from "../components/shared/layout/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/Language";
import Cookies from "universal-cookie/lib";
import styles from '../styles/pages/activity/Activity.module.css'
import shared from '../styles/shared/Shared.module.css'
import ActivityComponent from "../components/activity/Activity";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";
import ActivityFilterComponent from "../components/activity/ActivityFilter";
import fetchActivityData from "../utils/activity/FetchData";

export default function Activity() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [changed, setChanged] = useState(false)
    const [method, setMethod] = useState(null)
    const [thisMachine, setThisMachine] = useState(false)
    const [path, setPath] = useState(null)
    const [maxID, setMaxID] = useState(null)
    const [lastFetchSize, setLastFetchSize] = useState(null)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        fetchActivityData({
            type: 1,
            setLastFetchedSize: lastFetchSize,
            setData: setData,
            data: data,
            setMaxID: setMaxID,
            maxID: maxID,
            setError: setError,
            setErrorMessage: setErrorMessage,
            thisMachine: thisMachine,
            startDate: startDate,
            method: method,
            path: path
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
            <Layout>
                {props =>
                    <>
                        <div className={shared.header_container}
                             style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
                            <props.getTitle pageName={lang.title} pageTitle={lang.title} pageInfo={lang.info1}/>
                            <ActivityFilterComponent lang={lang} path={path} startDate={startDate}
                                                     dark={props.dark} changed={changed}
                                                     setChanged={setChanged} setPath={setPath}
                                                     setMethod={setMethod} setStartDate={setStartDate}
                                                     setThisMachine={setThisMachine} method={method}
                                                     thisMachine={thisMachine} setResponseData={setData}
                                                     setLastFetchSize={setLastFetchSize}
                                                     lastFetchSize={lastFetchSize}/>
                        </div>
                        <div className={styles.infinite_scroll_container}>
                            {data.length > 0 ?
                                <InfiniteScroll
                                    dataLength={data.length} //This is important field to render the next data
                                    next={() => fetchActivityData({
                                        type: 0,
                                        setLastFetchedSize: lastFetchSize,
                                        setData: setData,
                                        data: data,
                                        setMaxID: setMaxID,
                                        maxID: maxID,
                                        setError: setError,
                                        setErrorMessage: setErrorMessage,
                                        thisMachine: thisMachine,
                                        startDate: startDate,
                                        method: method,
                                        path: path
                                    }).catch(error => console.log(error))
                                    }
                                    hasMore={lastFetchSize === 20 && data[data.length - 1].id > 0}
                                    inverse={false}
                                    scrollableTarget="scrollableDiv"
                                    loader={<Skeleton variant={'rect'} width={'100%'} style={{borderRadius: '8px'}}
                                                      height={'7vh'}/>}
                                    endMessage={
                                        <div style={{
                                            width: '90%',
                                            margin: 'auto',
                                            borderRadius: '8px',
                                            border: !props.dark ? '#e2e2e2 1px solid' : null,
                                            backgroundColor: props.dark ? '#3b424c' : null
                                        }}>
                                            <p style={{textAlign: 'center', fontWeight: 445}}>{lang.end}</p>
                                        </div>
                                    }
                                >
                                    <div className={styles.activities_container}>
                                        {data.map(activity => (
                                            <ActivityComponent lang={lang} dark={props.dark} activity={activity}
                                            />
                                        ))}
                                    </div>
                                </InfiniteScroll>
                                :
                                <div style={{
                                    width: '90%',
                                    margin: 'auto',
                                    borderRadius: '8px',
                                    border: !props.dark ? '#e2e2e2 1px solid' : null,
                                    backgroundColor: props.dark ? '#3b424c' : null
                                }}>
                                    <p style={{textAlign: 'center', fontWeight: 445}}>{lang.nothingFound}</p>
                                </div>
                            }
                        </div>
                    </>
                }
            </Layout>
        )
    else
        return <></>
}
