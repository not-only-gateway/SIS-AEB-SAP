import Layout from "../components/shared/layout/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from '../styles/index/Index.module.css'
import PersonCard from "../components/index/PersonCard";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {getLanguage} from "../utils/shared/Language";
import IndexComponent from "../components/index/IndexComponent";
import shared from '../styles/shared/Shared.module.css'
import getPageInfo from "../utils/index/GetPageInfo";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchIndexData from "../utils/index/FetchData";
import {getBorder, getSecondaryBackground, getSecondaryColor, getTertiaryBackground} from "../styles/shared/MainStyles";
import mainStyles from '../styles/shared/Main.module.css'

export default function Index() {

    const router = useRouter()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [lang, setLang] = useState(null)
    const [option, setOption] = useState('collaborators')
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [maxID, setMaxID] = useState(null)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        console.log(router.locale)

        setLang(getLanguage(router.locale, '/'))
        if (data.length === 0)
            fetchData().catch(error => console.log(error))
    }, [router.locale])

    async function fetchData(type, start) {
        await fetchIndexData({
            setResponse: setData,
            params: {
                input: searchInput.length === 0 ? null : searchInput,
                max_id: start ? null : maxID
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
            <Layout>
                {props =>
                    <ThemeProvider theme={createMuiTheme({
                        palette: {
                            type: props.dark ? "dark" : "light"
                        }
                    })}>

                        <div className={shared.header_container}
                             style={getSecondaryBackground({dark: props.dark})}>
                            <props.getTitle pageName={lang.extensions} pageTitle={lang.extensions}
                                            pageInfo={getPageInfo({
                                                info1: lang.info1,
                                                info2: lang.info2,
                                                info3: lang.info3,
                                                option: option
                                            })}/>

                            <IndexComponent dark={props.dark} setData={setData} setOption={setOption}
                                            option={option} lang={lang} setLoading={setLoading} fetchData={fetchData}
                                            searchInput={searchInput} setSearchInput={setSearchInput}
                                            setMaxID={setMaxID}
                            />
                        </div>

                        {!loading ?
                            data.length > 0 ?
                                <InfiniteScroll
                                    dataLength={data.length}
                                    next={() => fetchData(0)}
                                    hasMore={lastFetchedSize === 20}
                                    inverse={false}
                                    scrollableTarget="scrollableDiv"
                                    loader={<Skeleton variant={'rect'} width={'100%'} style={{borderRadius: '8px'}}
                                                      height={'7vh'}/>}
                                    endMessage={
                                        <div
                                            className={[mainStyles.mediumMargin, mainStyles.normalBorder, mainStyles.smallPadding, mainStyles.baseWidth].join(' ')}
                                            style={{...getTertiaryBackground({dark: props.dark}), ...getBorder({dark: props.dark})}}>
                                            <p className={mainStyles.primaryParagraph}
                                               style={{...{textAlign: 'center'}, ...getSecondaryColor({dark: props.dark})}}>{lang.end}</p>
                                        </div>
                                    }
                                >
                                    <div className={styles.personas_container}>
                                        {data.map(collaborator =>
                                            <PersonCard
                                                profile={collaborator.profile}
                                                collaboration={collaborator.collaboration}
                                                unit={collaborator.unit}
                                                dark={props.dark}
                                                inactiveLocale={lang.inactive}
                                            />
                                        )
                                        }
                                    </div>
                                </InfiniteScroll>
                                :
                                <div className={styles.personas_container}>
                                    <div
                                        className={[mainStyles.mediumMargin, mainStyles.normalBorder, mainStyles.smallPadding].join(' ')}
                                        style={{
                                            ...getTertiaryBackground({dark: props.dark}),
                                            ...getBorder({dark: props.dark}), ...{
                                                width: '90%',
                                                margin: 'auto',
                                            }
                                        }}>
                                        <p style={{textAlign: 'center', fontWeight: 445}}>{lang.nothingFound}</p>
                                    </div>
                                </div>

                            :
                            <div className={styles.personas_container}>
                                <Skeleton variant="rect" style={{
                                    borderRadius: '8px',
                                    width: '45vw',
                                    height: '11vh',
                                    backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                                }}/>
                            </div>
                        }
                    </ThemeProvider>
                }
            </Layout>
        )
    else
        return <></>
}