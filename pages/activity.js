import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import Cookies from "universal-cookie/lib";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";
import ActivityFilterComponent from "../components/modules/filters/ActivityFilters";
import fetchActivityData from "../utils/fetch/FetchActivity";
import {getTertiaryColor} from "../styles/shared/MainStyles";
import mainStyles from "../styles/shared/Main.module.css";
import HeaderLayout from "../components/layout/HeaderLayout";
import FiltersComponent from "../components/layout/FiltersComponent";
import ActivityTemplate from "../components/templates/list/ActivityTemplate";
import SearchBox from "../components/elements/SearchBox";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import Graph from "../components/modules/Graph";
import getMethodColor from "../utils/activity/GetMethodColor";

export default function activity() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [data, setData] = useState([])
    const [filters, setFilters] = useState({
        method: null,
        startDate: null,
        endDate: null,
        thisMachine: false,
        searchInput: ''
    })

    const [changed, setChanged] = useState(false)

    const [maxID, setMaxID] = useState(null)
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [dark, setDark] = useState(false)
    const [pagesFetched, setPagesFetched] = useState(0)
    const [openTab, setOpenTab] = useState(0)

    function handleChange(props) {
        console.log(props)
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
            thisMachine: filters.thisMachine,
            startDate: filters.startDate,
            endDate: filters.endDate,
            method: filters.method,
            path: filters.searchInput.length > 0 ? filters.searchInput : null,
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
        handleChange({name: 'searchInput', value: event})
    }

    if (lang !== null)
        return (
            <>
                <HeaderLayout
                    width={'65%'}
                    filterComponent={
                        <ActivityFilterComponent
                            lang={lang} filters={filters} handleChange={handleChange}
                            dark={dark} changed={changed}
                            setChanged={setChanged} fetch={fetch}

                            setResponseData={setData}
                            setLastFetchedSize={setLastFetchedSize}
                            setMaxID={setMaxID} setPagesFetched={setPagesFetched}

                        />
                    }
                    pageTitle={lang.title}
                    title={lang.title}
                    information={lang.information}
                    activeFiltersComponent={
                        <FiltersComponent
                            active={changed}
                            handleChange={handleChange}
                            applyChanges={() => {
                                setChanged(false)
                                fetch(1)
                            }}
                            setChanged={setChanged}
                            changed={changed}
                            activeFilters={[
                                {
                                    key: 'method',
                                    value: filters.method !== undefined ? filters.method : null
                                },
                                {
                                    key: 'startDate',
                                    value: filters.startDate !== null && filters.startDate ? lang.startDate + ' - ' + new Date(filters.startDate).toLocaleDateString() : null
                                },
                                {
                                    key: 'endDate',
                                    value: filters.endDate !== null && filters.endDate ? lang.endDate + ' - ' + new Date(filters.endDate).toLocaleDateString() : null
                                },
                                {
                                    key: 'searchInput',
                                    value: filters.searchInput.length > 0 ? filters.searchInput : null,
                                    type: 'text'
                                },
                                {
                                    key: 'thisMachine',
                                    value: filters.thisMachine ? lang.machine : null
                                },
                            ]}/>}
                    searchComponent={
                        <SearchBox searchInput={filters.searchInput} setSearchInput={event => handleObjectChange({event:  {name: 'searchInput', value: event}, setData: setFilters})} searchLocale={lang.search} setChanged={setChanged}/>
                    }
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%', position: 'relative'}}>
                    {data.length > 0 ?
                        <div style={{width: '65%'}}>
                            <InfiniteScroll
                                dataLength={data.length}
                                next={() => fetch(0)}
                                hasMore={lastFetchedSize === 20 && data[data.length - 1].access_log.id > 1}
                                inverse={false}
                                scrollableTarget="scrollableDiv"
                                loader={
                                    <Skeleton
                                        variant={'rect'}
                                        width={'100%'}
                                        style={{borderRadius: '8px'}}
                                        height={'7vh'}
                                    />
                                }
                                endMessage={
                                    <div
                                        style={{
                                            marginBottom: '15px'
                                        }}
                                    >
                                        <p className={mainStyles.secondaryParagraph}
                                           style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: dark})}}>{lang.end}</p>
                                    </div>
                                }
                            >
                                <div style={{
                                    display: 'grid',
                                    marginTop: '8px',
                                    gap: '8px',
                                }}>
                                    {(data).map(content =>
                                        <div key={content.activity.id}>
                                            <ActivityTemplate data={content} pagesFetched={pagesFetched}
                                                              lang={lang}/>
                                        </div>
                                    )}
                                </div>
                            </InfiniteScroll>
                        </div>
                        :

                        <div className={mainStyles.displayInlineCenter}
                             style={{
                                 marginBottom: '15px',
                                 width: '50vw'
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
