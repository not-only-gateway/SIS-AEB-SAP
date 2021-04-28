import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {createMuiTheme, Divider, ThemeProvider} from "@material-ui/core";
import {getLanguage} from "../utils/shared/PageLanguage";
import axios from "axios";
import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import Accordion from "../components/layout/Accordion";
import mainStyles from '../styles/shared/Main.module.css'
import shared from "../styles/shared/Shared.module.css";
import {getIconStyle} from "../styles/shared/MainStyles";
import {ExtensionRounded, ViewQuiltRounded} from "@material-ui/icons";
import GetPageTitle from "../utils/shared/GetPageTitle";
import Canvas from "../components/layout/Canvas";
import HeaderLayout from "../components/layout/HeaderLayout";
import ExtensionsFilters from "../components/modules/filters/ExtensionsFilters";
import ExtensionsSearch from "../components/elements/ExtensionsSearch";

export default function Structure() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [topUnits, setTopUnits] = useState([])
    const [topCollaborators, setTopCollaborators] = useState([])
    const [dark, setDark] = useState(false)


    useEffect(() => {
        setLang(getLanguage(router.locale, '/structure'))
        setDark((new Cookies()).get('theme') === 0)
        axios({
            method: 'get',
            url: Host() + 'top/units',
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            setTopUnits(res.data)
        }).catch(error => {
            console.log(error)
        })

        axios({
            method: 'get',
            url: Host() + 'top/collaborators',
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            setTopCollaborators(res.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    if (lang !== null)
        return (
            <>
                <HeaderLayout tab={undefined} filterComponent={undefined} pageTitle={lang.title} title={lang.title}
                              information={lang.information}
                              searchComponent={undefined}
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
                    <div style={{
                        width: '75%',
                        height: 'fit-content',
                        borderRadius: '8px',
                        display: 'grid',
                        gap: '16px',
                        marginTop: '16px'
                    }}>
                        <Accordion
                            content={topUnits.map((unit, index) => (
                                <>
                                    {index === 0 ?
                                        <Canvas dark={dark} type={'unit'} subject={unit}/> : null}
                                </>
                            ))
                            }
                            summary={
                                <div className={shared.accordionTitle}>
                                    <ViewQuiltRounded style={getIconStyle({dark: dark})}/>
                                    <Divider style={{width: '10px', marginRight: '10px'}} orientation={'horizontal'}/>
                                    <p className={mainStyles.secondaryParagraph}>{lang.units}</p>
                                </div>
                            }

                            dark={dark}
                            closedSize={100}
                            openSize={100}
                        />


                        <Accordion
                            content={topCollaborators.map((collaborator, index) => (
                                <>
                                    {index === 0 ?
                                        <Canvas dark={dark} type={'collaborator'} subject={collaborator}/>
                                        :
                                        null
                                    }
                                </>
                            ))}
                            summary={
                                <div className={shared.accordionTitle}>
                                    <ExtensionRounded style={getIconStyle({dark: dark})}/>
                                    <Divider style={{width: '10px', marginRight: '10px'}} orientation={'horizontal'}/>
                                    <p className={mainStyles.secondaryParagraph}>{lang.collaborators}</p>
                                </div>
                            }

                            dark={dark}
                            closedSize={100}
                            openSize={100}
                        />
                    </div>
                </div>
            </>
        )
    else
        return <></>
}
