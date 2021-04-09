import Layout from "../components/shared/layout/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/Language";
import Cookies from "universal-cookie/lib";
import AccordionLayout from "../components/shared/layout/AccordionLayout";
import styles from '../styles/Activity.module.css'
import axios from "axios";
import Host from "../utils/Host";
import localIpUrl from "local-ip-url";
import {Button, Divider} from "@material-ui/core";
import shared from '../styles/Shared.module.css'
import InputLayout from "../components/shared/layout/InputLayout";
import ActivityComponent from "../components/activity/Activity";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";
import makeRequest from "../utils/Request";
import PropTypes from "prop-types";
import ActivityFilterComponent from "../components/activity/ActivityFilter";

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

    async function fetchData(type) {
        await makeRequest({
            package: {
                start_date: startDate !== null ? startDate.getTime() : null,
                ip: thisMachine ? localIpUrl('public') : null,
                method: method,
                path: path,
                max_id: type === 1 ? null : maxID
            },
            method: 'get',
            url: 'activity',
            host: Host()
        }).then(response => {

            if (response.error) {
                setError(true)
                setErrorMessage(response.errorMessage)
            } else {
               switch (type){
                   case 0: {
                       setData([...data, ...response.data])
                       if (response.data.length > 0)
                           setMaxID(response.data[response.data.length - 1].id)
                       setLastFetchSize(response.data.length)
                       break
                   }
                   case 1:{

                       setData(response.data)
                       if (response.data.length > 0)
                           setMaxID(response.data[response.data.length - 1].id)
                       setLastFetchSize(response.data.length)
                       break
                   }
                   default: console.log(type)
               }

            }
        })
    }

    function getMethodColor(method) {
        let response = null

        switch (method) {
            case 'GET': {
                response = '#249a44'
                break
            }
            case 'POST': {
                response = '#f2ac04'
                break
            }
            case 'PUT': {
                response = '#0c74da'
                break
            }
            case 'DELETE': {
                response = '#e62214'
                break
            }
            default:
                break
        }

        return response
    }

    useEffect(() => {
        fetchData(1).catch(error => console.log(error))

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
                                                     thisMachine={thisMachine} fetchData={fetchData}/>
                        </div>
                        <div className={styles.infinite_scroll_container}>
                            {data.length > 0 ?
                                <InfiniteScroll
                                    dataLength={data.length} //This is important field to render the next data
                                    next={() => fetchData(0)}
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
                                                               getColor={getMethodColor}/>
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
