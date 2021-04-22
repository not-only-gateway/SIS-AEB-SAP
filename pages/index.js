import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from '../styles/index/Index.module.css'
import PersonCard from "../components/index/PersonCard";
import {Button, createMuiTheme, ThemeProvider} from "@material-ui/core";
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
import ListLayout from "../components/layout/ListLayout";

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

    function redirect(id) {
        router.push({
            pathname: '/person',
            query: {id: id}
        })
    }

    function sortByExtension(descending) {
        let newData = data
        setData([])
        newData = newData.sort((a, b) => descending ? (b.profile.id - a.profile.id) : (a.profile.id - b.profile.id));

        setData([...newData])
    }

    function sortByName(descending) {
        let newData = data
        setData([])
        newData = newData.sort(function(a, b){
            if(!descending){
                if(a.profile.name < b.profile.name) { return -1; }
                if(a.profile.name > b.profile.name) { return 1; }
                return 0;
            }
            else{
                if(a.profile.name > b.profile.name) { return -1; }
                if(a.profile.name < b.profile.name) { return 1; }
                return 0;
            }
        })
        setData([...newData])
    }

    function sortByEmail(descending) {
        let newData = data
        setData([])
        newData = newData.sort(function(a, b){
            if(!descending){
                if(a.profile.corporate_email < b.profile.corporate_email) { return -1; }
                if(a.profile.corporate_email > b.profile.corporate_email) { return 1; }
                return 0;
            }
            else{
                if(a.profile.corporate_email > b.profile.corporate_email) { return -1; }
                if(a.profile.corporate_email < b.profile.corporate_email) { return 1; }
                return 0;
            }
        })

        setData([...newData])
    }

    function sortByUnit(descending) {
        let newData = data
        setData([])
        newData = newData.sort(function(a, b){
            if(descending){
                if(a.unit.acronym < b.unit.acronym) { return -1; }
                if(a.unit.acronym > b.unit.acronym) { return 1; }
                return 0;
            }
            else{
                if(a.unit.acronym > b.unit.acronym) { return -1; }
                if(a.unit.acronym < b.unit.acronym) { return 1; }
                return 0;
            }
        })

        setData([...newData])
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

                                {data.map((collaborator, index) =>
                                    <div key={collaborator.profile.id} onClick={() => redirect(collaborator.profile.id)} style={{padding: 0}}>
                                        <PersonCard
                                            profile={collaborator.profile}
                                            collaboration={collaborator.collaboration}
                                            unit={collaborator.unit}
                                            lastActivity={collaborator.last_activity}
                                            dark={dark}
                                            index={index}
                                            asProfile={false}
                                            inactiveLocale={lang.inactive}
                                            redirect={redirect}
                                        />
                                    </div>
                                )}
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
                    <GetPageTitle
                        pageName={lang.extensions} pageTitle={lang.extensions}
                    />
                }

                filterComponent={
                    <IndexComponent dark={dark} setData={setData} setOption={setOption}
                                    option={option} lang={lang} setLoading={setLoading} fetchData={fetchData}
                                    searchInput={searchInput} setSearchInput={setSearchInput}
                                    setMaxID={setMaxID} width={55}
                    />

                }
                filterVerticalOrientation={false}
                width={55}
                columnWidth={55}
                columns={[
                    {label: 'Name', size: 19.5, sorter: sortByName},
                    {label: 'Email', size: 15, sorter: sortByEmail},
                    {label: 'Extension', size: 9.5, sorter: sortByExtension},
                    {label: 'Status', size: 6},
                    {label: 'Unit', size: 5, sorter: sortByUnit},
                ]}
            />
        )
    else
        return <></>
}