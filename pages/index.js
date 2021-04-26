import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Skeleton} from "@material-ui/lab";
import {getLanguage} from "../utils/shared/Language";
import IndexComponent from "../components/pages/index/IndexComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchIndexData from "../utils/index/FetchData";
import {getTertiaryColor} from "../styles/shared/MainStyles";
import mainStyles from '../styles/shared/Main.module.css'
import GetPageTitle from "../utils/shared/GetPageTitle";
import ListLayout from "../components/list/ListLayout";
import IndexListRenderer from "../components/pages/index/IndexListRenderer";

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
    function handleInputChange(event){
        if(event.length === 0)
            fetchData(0, true, false)
        setSearchInput(event)
    }
    function redirect(id) {
        router.push({
            pathname: '/person',
            query: {id: id}
        })
    }
    function handleSorterChange(event){
        if(event === sorterMethod)
            setSorterMethod(undefined)
        else
            setSorterMethod(event)
    }

    if (lang !== null)
        return (

            <ListLayout
                content={
                    !loading ?
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
                                    <div style={{
                                        width: '100%'
                                    }}>
                                        <p className={mainStyles.secondaryParagraph}
                                           style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: dark})}}>{lang.end}</p>
                                    </div>
                                }
                            >
                                <IndexListRenderer sorterMethod={sorterMethod} data={data} redirect={redirect} inactiveLocale={lang.inactive}/>
                            </InfiniteScroll>
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
                        </div>
                }
                title={
                    lang.extensions
                }

                basicSearchComponent={
                    <IndexComponent dark={dark} setData={setData} setOption={setOption}
                                    option={option} lang={lang} setLoading={setLoading} fetchData={fetchData}
                                    searchInput={searchInput} setSearchInput={handleInputChange}
                                    setMaxID={setMaxID} width={55}
                    />

                }
                width={65}
                columnWidth={55}
                handleSorterChange={handleSorterChange}
                columns={[
                    {label: 'Name', key: 'name'},
                    {label: 'Email', key: undefined},
                    {label: 'Extension', key: 'extension'},
                    {label: 'Status', key: undefined},
                    {label: 'Unit', key: undefined},
                ]}
                currentSorter={sorterMethod}
            />
        )
    else
        return <></>
}