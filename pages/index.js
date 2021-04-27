import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Skeleton} from "@material-ui/lab";
import {getLanguage} from "../utils/shared/Language";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchIndexData from "../utils/index/FetchData";
import {getTertiaryColor} from "../styles/shared/MainStyles";
import mainStyles from '../styles/shared/Main.module.css'
import ExtensionsSearch from "../components/elements/ExtensionsSearch";
import ExtensionsList from "../components/templates/ExtensionsList";
import ExtensionsFilters from "../components/modules/filters/ExtensionsFilters";
import HeaderLayout from "../components/layout/HeaderLayout";

export default function Index() {

    const router = useRouter()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [lang, setLang] = useState(null)
    const [option, setOption] = useState('collaborators')
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [maxID, setMaxID] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [dark, setDark] = useState(false)
    const [sorterMethod, setSorterMethod] = useState(undefined)

    useEffect(() => {
        setLang(getLanguage(router.locale, '/'))
        if (data.length === 0)
            fetchData(1, true, false).catch(error => console.log(error))
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

    function handleInputChange(event) {
        if (event.length === 0)
            fetchData(1, true, false)
        setSearchInput(event)
    }

    function redirect(id) {
        router.push({
            pathname: '/person',
            query: {id: id}
        })
    }


    if (lang !== null)
        return (
            <>

                <HeaderLayout tab={
                    undefined
                } filterComponent={
                    <ExtensionsFilters
                        dark={dark} setData={setData} setOption={setOption}
                        option={option} lang={lang} setLoading={setLoading} fetchData={fetchData}
                        searchInput={searchInput} setSearchInput={handleInputChange}
                        setMaxID={setMaxID}
                    />
                } pageTitle={lang.extensions} title={lang.extensions} searchComponent={
                    <ExtensionsSearch
                        dark={dark} setData={setData} setOption={setOption}
                        option={option} lang={lang} setLoading={setLoading} fetchData={fetchData}
                        searchInput={searchInput} setSearchInput={handleInputChange}
                        setMaxID={setMaxID} width={100}
                    />
                }
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
                    {!loading ?
                        data.length > 0 ?
                            <div style={{width: '75%'}}>
                            <InfiniteScroll
                                dataLength={data.length}
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
                                           style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: dark})}}>{lang.end}</p>
                                    </div>
                                }
                            >
                                <ExtensionsList sorterMethod={sorterMethod} data={data} redirect={redirect}
                                                inactiveLocale={lang.inactive}/>
                            </InfiniteScroll>
                            </div>
                            :

                            <div className={mainStyles.displayInlineCenter} style={{
                                ...{marginBottom: '15px', width: '50vw'}
                            }}>
                                <p className={mainStyles.secondaryParagraph}
                                   style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: dark})}}>{lang.nothingFound}</p>
                            </div>

                        :
                        <div className={mainStyles.displayInlineCenter} style={{
                            ...{marginBottom: '15px', width: '50vw'}
                        }}>
                            <p className={mainStyles.secondaryParagraph}
                               style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: dark})}}>Loading</p>
                        </div>}
                </div>
            </>
        )
    else
        return <></>
}