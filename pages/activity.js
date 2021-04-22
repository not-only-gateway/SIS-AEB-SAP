import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/Language";
import Cookies from "universal-cookie/lib";
import styles from '../styles/activity/Activity.module.css'
import ActivityComponent from "../components/pages/activity/Activity";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";
import ActivityFilterComponent from "../components/pages/activity/ActivityFilter";
import fetchActivityData from "../utils/activity/FetchData";
import {getTertiaryColor} from "../styles/shared/MainStyles";
import mainStyles from "../styles/shared/Main.module.css";
import GetPageTitle from "../utils/shared/GetPageTitle";
import ListLayout from "../components/list/ListLayout";

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

    function handleChange(props) {
        setFilters(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
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
            path: filters.path
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
            <ListLayout
                columns={[
                    {label: 'ID', size: 10},
                    {label: lang.method, size: 10},
                    {label: 'Path', size: 10},
                    {label: 'CREATION', size: 10},
                ]}
                title={
                    <GetPageTitle pageName={lang.title} pageTitle={lang.title}
                                  dark={dark}/>
                }
                content={
                    data.length > 0 ?
                        <InfiniteScroll
                            dataLength={data.length}
                            next={() => fetchActivityData({
                                type: 0,
                                setLastFetchedSize: lastFetchedSize,
                                setData: setData,
                                data: data,
                                setMaxID: setMaxID,
                                maxID: maxID,
                                setError: setError,
                                setErrorMessage: setErrorMessage,
                                thisMachine: thisMachine,
                                startDate: filters.date,
                                method: filters.method,
                                path: filters.path
                            }).catch(error => console.log(error))
                            }
                            hasMore={lastFetchedSize === 20 && data[data.length - 1].id > 1}
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
                            <div className={styles.activitiesContainer}>
                                {data.map((data, index) => (
                                        <ActivityComponent lang={lang} dark={dark} activity={data.activity}
                                                           accessLog={data.access_log} index={index}
                                        />
                                    )
                                )}
                            </div>

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
                                             setMaxID={setMaxID}/>

                }
                filterVerticalOrientation={true}
                width={88}
                columnWidth={45}
            />
        )
    else
        return <></>
}
