import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Skeleton} from "@material-ui/lab";
import {getLanguage} from "../utils/shared/PageLanguage";
import InfiniteScroll from "react-infinite-scroll-component";
import FetchData from "../utils/fetch/FerchExtensions";
import {getTertiaryColor} from "../styles/shared/MainStyles";
import mainStyles from '../styles/shared/Main.module.css'
import SearchBox from "../components/elements/SearchBox";

import ExtensionsFilters from "../components/modules/filters/ExtensionsFilters";
import HeaderLayout from "../components/layout/HeaderLayout";
import FiltersComponent from "../components/layout/FiltersComponent";
import Extension from "../components/templates/list/Extension";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import TabContent from "../components/templates/TabContent";
import Canvas from "../components/layout/Canvas";
import Extensions from "../components/modules/Extensions";
import CollaboratorsStructure from "../components/modules/CollaboratorsStructure";
import fetchTopCollaborators from "../utils/fetch/FetchTopCollaborators";
import UnitsStructure from "../components/modules/UnitsStructure";

export default function Index() {

    const router = useRouter()
    const [data, setData] = useState([])
    const [lang, setLang] = useState(null)
    const [openTab, setOpenTab] = useState(0)
    const [accessProfile, setAccessProfile] = useState(null)
    const [changed, setChanged] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        setLang(getLanguage(router.locale, '/units'))
        // if (data.length === 0)
        //     fetchData(1, true, false).catch(error => console.log(error))
        // if (accessProfile === null)
        //     readAccessProfile().then(profile => {
        //         setAccessProfile(profile)
        //     })
    }, [])

    function redirect(id) {
        router.push({
            pathname: '/unit',
            query: {id: id}
        })
    }

    if (lang !== null)
        return (
            <>
                <HeaderLayout
                    width={'75%'}
                    availableTabs={{
                        tabs: [
                            {
                                disabled: false,
                                key: 0,
                                value: 'Overview'
                            },
                            {
                                disabled: false,
                                key: 1,
                                value: 'Structure'
                            },
                        ],
                        setOpenTab: setOpenTab,
                        openTab: openTab
                    }}
                    pageTitle={lang.title}
                    title={lang.title}
                    information={openTab === 1 ? lang.information : undefined}
                    searchComponent={
                        openTab === 0 ?
                            <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} searchLocale={lang.search} setChanged={setChanged}/>
                            :
                            undefined
                    }

                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%', position: 'relative'}}>

                    <div style={{
                        width: '75%',
                        height: 'fit-content',
                        borderRadius: '8px',
                        display: 'grid',
                        gap: '16px'
                    }}>
                        <TabContent
                            openTab={openTab}
                            tabs={[
                                {
                                    buttonKey: 0,
                                    value: (
                                        null
                                    )
                                },

                                {
                                    buttonKey: 1,
                                    value: (
                                        <UnitsStructure/>
                                    )
                                }
                            ]}/>
                    </div>
                </div>

            </>
        )
    else
        return <></>
}