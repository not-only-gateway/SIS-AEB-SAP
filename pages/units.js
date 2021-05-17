import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {getTertiaryColor} from "../styles/shared/MainStyles";
import mainStyles from '../styles/shared/Main.module.css'
import SearchBox from "../components/elements/SearchBox";
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";
import Link from 'next/link'
import fetchUnits from "../utils/fetch/FetchUnits";
import {Button} from "@material-ui/core";
import UnitsStructure from "../components/modules/structure/UnitsStructure";

export default function Index() {

    const router = useRouter()
    const [data, setData] = useState([])
    const [lang, setLang] = useState(null)
    const [openTab, setOpenTab] = useState(0)
    const [hoveredUnit, setHoveredUnit] = useState(null)
    const [changed, setChanged] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const headerStyle =(key) => {
        return {
            marginTop: "0",
            marginBottom: 0,
            marginRight: '5px',
            color: '#262626',
            transition: '300ms ease-in-out'
        }
    }
    const secondaryHeaderStyle=(key) => {
        return {
            color: '#555555',
            marginBottom: 0,
            marginTop: 0,
            transition: '300ms ease-in-out',
            marginRight: '25px'
        }
    }

    useEffect(() => {
        setLang(getLanguage(router.locale, '/units'))
        fetchUnits().then(res => setData(res))
    }, [])

    function rendered() {
        let count = 0
        data.filter(unit =>{
            if(searchInput.length === 0 || (searchInput.length > 0 && unit.name.toLowerCase().match(searchInput.toLowerCase()) && !changed) || changed)
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
                                value: lang.list
                            },
                            {
                                disabled: false,
                                key: 1,
                                value: lang.structure
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
                                       searchLocale={lang.search} setChanged={setChanged} applyChanges={() => setChanged(false)}/>
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
                                                                borderRadius: '8px',
                                                                backgroundColor: '#f4f5fa',
                                                                border: hoveredUnit === unit.id ? '#0095ff .7px solid' : '#ecedf2 .7px solid',
                                                                transition: '300ms ease-in-out',
                                                                display: searchInput.length === 0 || (searchInput.length > 0 && unit.name.toLowerCase().match(searchInput.toLowerCase()) && !changed) || changed  ? 'flex' : 'none',
                                                                justifyContent: 'flex-start',
                                                                alignItems: 'center',
                                                                alignContent: 'center',
                                                                height: '70px',
                                                                padding: '8px',
                                                                boxShadow: hoveredUnit === unit.id ? 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' : 'unset'
                                                            }}>
                                                            <h5 style={headerStyle(unit.id)}>{lang.acronym}: </h5>
                                                            <h5 style={secondaryHeaderStyle(unit.id)}>{unit.acronym}</h5>
                                                            <h5 style={headerStyle(unit.id)}>{lang.name}:</h5>
                                                            <h5 style={secondaryHeaderStyle(unit.id)}>{unit.name}</h5>
                                                            {unit.parent_unit_acronym !== null ?
                                                                <>
                                                                    <h5 style={headerStyle(unit.id)}>{lang.parentUnit}:</h5>
                                                                    <h5 style={secondaryHeaderStyle(unit.id)}>{unit.parent_unit_acronym}</h5>
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