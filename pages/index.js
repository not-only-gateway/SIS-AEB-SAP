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
import {
    getBorder,
    getBoxShadow, getSecondaryBackground,
    getPrimaryBackground,
    getTertiaryBackground,
    getTertiaryColor
} from "../styles/shared/MainStyles";
import mainStyles from '../styles/shared/Main.module.css'
import Cookies from "universal-cookie/lib";
import GetPageTitle from "../utils/shared/GetPageTitle";

export default function Index() {

    const router = useRouter()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [lang, setLang] = useState(null)
    const [option, setOption] = useState('collaborators')
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [maxID, setMaxID] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [accessProfile, setAccessProfile] = useState(null)
    const [dark, setDark] = useState(false)

    useEffect(() => {
        setDark((new Cookies()).get('theme') === 0)

        setLang(getLanguage(router.locale, '/'))
        if (data.length === 0)
            fetchData().catch(error => console.log(error))
    }, [router.locale])

    async function fetchData(type, start, search) {

        await fetchIndexData({
            setResponse: setData,
            params: {
                input: search === false ? null : searchInput.length === 0 ? null : searchInput,
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
            <ThemeProvider theme={createMuiTheme({
                palette: {
                    type: dark ? "dark" : "light"
                }
            })}>

                <div className={shared.header_container}
                     style={getPrimaryBackground({dark: dark})}>
                    <GetPageTitle pageName={lang.extensions} pageTitle={lang.extensions}
                                  pageInfo={getPageInfo({
                                      info1: lang.info1,
                                      info2: lang.info2,
                                      info3: lang.info3,
                                      option: option
                                  })} dark={dark}/>

                    <IndexComponent dark={dark} setData={setData} setOption={setOption}
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
                            hasMore={lastFetchedSize === 15}
                            inverse={false}
                            scrollableTarget="scrollableDiv"
                            loader={<Skeleton variant={'rect'} width={'100%'} style={{borderRadius: '8px'}}
                                              height={'7vh'}/>}
                            endMessage={
                                <div
                                    className={[mainStyles.marginVertical, mainStyles.normalBorder, mainStyles.smallPaddingVertical, mainStyles.baseWidth].join(' ')}
                                    style={{...getSecondaryBackground({dark: dark}), ...{transform: 'translateY(.9vw)', marginBottom:'1.8vw'},}}>
                                    <p className={mainStyles.secondaryParagraph}
                                       style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: dark})}}>{lang.end}</p>
                                </div>
                            }
                        >
                            <div className={[styles.personas_container, mainStyles.baseWidth].join(' ')}>
                                {data.map(collaborator =>
                                    <PersonCard
                                        profile={collaborator.profile}
                                        collaboration={collaborator.collaboration}
                                        unit={collaborator.unit}
                                        lastActivity={collaborator.last_activity}
                                        dark={dark}
                                        asProfile={false}
                                        inactiveLocale={lang.inactive}
                                    />
                                )}
                                {data.map(collaborator =>
                                    <PersonCard
                                        profile={collaborator.profile}
                                        collaboration={collaborator.collaboration}
                                        unit={collaborator.unit}
                                        lastActivity={collaborator.last_activity}
                                        dark={dark}
                                        asProfile={false}
                                        inactiveLocale={lang.inactive}
                                    />
                                )}
                                {data.map(collaborator =>
                                    <PersonCard
                                        profile={collaborator.profile}
                                        collaboration={collaborator.collaboration}
                                        unit={collaborator.unit}
                                        lastActivity={collaborator.last_activity}
                                        dark={dark}
                                        asProfile={false}
                                        inactiveLocale={lang.inactive}
                                    />
                                )}
                            </div>
                        </InfiniteScroll>
                        :

                        <div
                            className={[mainStyles.baseWidth, mainStyles.normalBorder, mainStyles.displayInlineCenter].join(' ')}
                            style={{
                                ...getSecondaryBackground({dark: dark}),
                            }}>
                            <p className={mainStyles.secondaryParagraph}
                               style={getTertiaryColor({dark: dark})}>{lang.nothingFound}</p>
                        </div>

                    :
                    <div className={styles.personas_container}>
                        <Skeleton variant="rect" style={{
                            ...{
                                borderRadius: '8px',
                                width: '45vw',
                                height: '11vh',
                            },
                            ...getSecondaryBackground({dark: dark})
                        }}/>
                    </div>
                }
            </ThemeProvider>
        )
    else
        return <></>
}