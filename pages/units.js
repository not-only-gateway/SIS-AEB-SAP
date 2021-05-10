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
import Link from 'next/link'
import fetchUnits from "../utils/fetch/FetchUnits";
import {Button} from "@material-ui/core";
import UnitsStructure from "../components/modules/UnitsStructure";

export default function Index() {

    const router = useRouter()
    const [data, setData] = useState([])
    const [lang, setLang] = useState(null)
    const [openTab, setOpenTab] = useState(0)
    const [hoveredUnit, setHoveredUnit] = useState(null)
    const [changed, setChanged] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        setLang(getLanguage(router.locale, '/units'))
        fetchUnits().then(res => setData(res))
    }, [])

    function rendered() {
        let count = 0
        data.filter(unit =>{
            if(searchInput.length > 0 && (unit.name.toLowerCase()).match(searchInput.toLowerCase()) || searchInput.length === 0)
                count += 1
            }
        )

        return count
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
                            <SearchBox searchInput={searchInput} setSearchInput={setSearchInput}
                                       searchLocale={lang.search} setChanged={setChanged}/>
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
                                        <div style={{display: 'grid', gap: '8px', width: '100%'}} key={'units-container'}>
                                            {rendered() > 0 ? data.map((unit, index) => (
                                                <div key={unit.id.toString()}>
                                                    <Link href={{pathname: '/unit', query: {id: unit.id}}}>
                                                        <Button
                                                            onMouseEnter={() => setHoveredUnit(unit.id)}
                                                            onMouseLeave={() => setHoveredUnit(null)}
                                                            style={{
                                                                animationDelay: index * 200 + 'ms',
                                                                width: '100%',
                                                                textTransform: 'none',
                                                                color: 'initial',
                                                                borderRadius: '8px',
                                                                border: hoveredUnit === unit.id ? '#0095ff .7px solid' : 'transparent  .7px solid',
                                                                boxShadow: hoveredUnit === unit.id ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                                                                backgroundColor: 'white',
                                                                transition: '300ms ease-in-out',
                                                                display: (searchInput.length > 0 && (unit.name.toLowerCase()).match(searchInput.toLowerCase()) || searchInput.length === 0) ? 'flex' : 'none',
                                                                justifyContent: 'flex-start',
                                                                alignItems: 'center',
                                                                alignContent: 'center',
                                                                minHeight: '70px',
                                                            }}>
                                                            <h5 style={{
                                                                marginTop: "0",
                                                                marginBottom: 0,
                                                                marginRight: '5px'
                                                            }}>Acronym: </h5>
                                                            <h5 style={{
                                                                color: '#555555',
                                                                marginBottom: 0,
                                                                marginTop: "0",
                                                                marginRight: '25px'
                                                            }}>{unit.acronym}</h5>
                                                            <h5 style={{
                                                                marginTop: "0",
                                                                marginBottom: 0,
                                                                marginRight: '5px'
                                                            }}>Name:</h5>
                                                            <h5 style={{
                                                                color: '#555555',
                                                                marginBottom: 0,
                                                                marginTop: 0,
                                                                marginRight: '25px'
                                                            }}>{unit.name}</h5>
                                                            {unit.parent_unit_acronym !== null ?
                                                                <>
                                                                    <h5 style={{marginTop: "0", marginBottom: 0,marginRight: '5px'}}>Parent
                                                                        Unit:</h5>
                                                                    <h5 style={{
                                                                        color: '#555555',
                                                                        marginBottom: 0,
                                                                        marginTop: 0
                                                                    }}>{unit.parent_unit_acronym}</h5>
                                                                </>
                                                                :
                                                                null
                                                            }
                                                        </Button>
                                                    </Link>
                                                </div>
                                            )) :
                                                <div className={mainStyles.displayInlineCenter} style={{
                                                    ...{marginBottom: '15px', width: '100%'}
                                                }}>
                                                    <p className={mainStyles.secondaryParagraph}
                                                       style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: false})}}>{lang.nothingFound}</p>
                                                </div>
                                            }
                                        </div>
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