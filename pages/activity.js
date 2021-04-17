import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/Language";
import Cookies from "universal-cookie/lib";
import styles from '../styles/activity/Activity.module.css'
import shared from '../styles/shared/Shared.module.css'
import ActivityComponent from "../components/activity/Activity";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";
import ActivityFilterComponent from "../components/activity/ActivityFilter";
import fetchActivityData from "../utils/activity/FetchData";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import {
    getBorder,
    getBoxShadow,
    getSecondaryBackground,
    getTertiaryBackground,
    getTertiaryColor
} from "../styles/shared/MainStyles";
import mainStyles from "../styles/shared/Main.module.css";
import GetPageTitle from "../utils/shared/GetPageTitle";

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
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [dark, setDark] = useState(false)

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
            <ThemeProvider theme={createMuiTheme({
                palette: {
                    type: dark ? "dark" : "light"
                }
            })}>
                <div className={shared.header_container}
                     style={getSecondaryBackground({dark: dark})}>
                    <GetPageTitle pageName={lang.title} pageTitle={lang.title} pageInfo={lang.info1} dark={dark}/>

                    <ActivityFilterComponent lang={lang} path={path} startDate={startDate}
                                             dark={dark} changed={changed}
                                             setChanged={setChanged} setPath={setPath}
                                             setMethod={setMethod} setStartDate={setStartDate}
                                             setThisMachine={setThisMachine} method={method}
                                             thisMachine={thisMachine} setResponseData={setData}
                                             setLastFetchedSize={setLastFetchedSize}
                                             setMaxID={setMaxID}/>
                </div>
                <div className={styles.infinite_scroll_container}>
                    {data.length > 0 ?
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
                                startDate: startDate,
                                method: method,
                                path: path
                            }).catch(error => console.log(error))
                            }
                            hasMore={lastFetchedSize === 20 && data[data.length - 1].activity.id > 1}
                            inverse={false}
                            scrollableTarget="scrollableDiv"
                            loader={<Skeleton variant={'rect'} width={'100%'} style={{borderRadius: '8px'}}
                                              height={'7vh'}/>}
                            endMessage={
                                <div
                                    className={[mainStyles.marginVertical, mainStyles.normalBorder, mainStyles.smallPaddingVertical, mainStyles.baseWidth].join(' ')}
                                    style={{...getTertiaryBackground({dark: dark}), ...getBorder({dark: dark}), ...getBoxShadow({dark: dark})}}>
                                    <p className={mainStyles.secondaryParagraph}
                                       style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: dark})}}>{lang.end}</p>
                                </div>
                            }
                        >
                            <div className={styles.activities_container}>
                                {data.map(data => (
                                        <ActivityComponent lang={lang} dark={dark} activity={data.activity}
                                                           accessLog={data.access_log}
                                        />
                                    )
                                )}
                            </div>
                        </InfiniteScroll>
                        :
                        <div
                            className={[mainStyles.baseWidth, mainStyles.normalBorder, mainStyles.displayInlineCenter].join(' ')}
                            style={{
                                ...getTertiaryBackground({dark: dark}),
                                ...getBoxShadow({dark: dark}),
                                ...getBorder({dark: dark})
                            }}>
                            <p className={mainStyles.secondaryParagraph}
                               style={getTertiaryColor({dark: dark})}>{lang.nothingFound}</p>
                        </div>
                    }
                </div>
            </ThemeProvider>
        )
    else
        return <></>
}
