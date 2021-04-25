import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {createMuiTheme, Divider, ThemeProvider} from "@material-ui/core";
import {getLanguage} from "../utils/shared/Language";
import axios from "axios";
import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import AccordionLayout from "../components/layout/AccordionLayout";
import mainStyles from '../styles/shared/Main.module.css'
import shared from "../styles/shared/Shared.module.css";
import {getIconStyle} from "../styles/shared/MainStyles";
import {ExtensionRounded, ViewQuiltRounded} from "@material-ui/icons";
import GetPageTitle from "../utils/shared/GetPageTitle";
import ContentCanvas from "../components/pages/structure/ContentCanvas";

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
            <div className={mainStyles.displayInlineCenter}>
                <div style={{width: '63vw'}}>

                    <div className={[mainStyles.displayColumnSpaced, mainStyles.baseWidth].join(' ')} style={{
                        width: 'fit-content',
                        height: 'fit-content',
                        borderRadius: '8px',
                        gap: '.9vw'
                    }}>
                        <GetPageTitle pageName={lang.title} pageTitle={lang.title} pageInfo={lang.information}
                                      dark={dark}/>
                        <AccordionLayout
                            content={topUnits.map((unit, index) => (
                                <>
                                    {index === 0 ?
                                        <ContentCanvas dark={dark} type={'unit'} subject={unit}/> : null}
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
                            closedSize={63}
                            openSize={63}
                        />


                        <AccordionLayout
                            content={topCollaborators.map((collaborator, index) => (
                                <>
                                    {index === 0 ?
                                        <ContentCanvas dark={dark} type={'collaborator'} subject={collaborator}/>
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
                            closedSize={63}
                            openSize={63}
                        />
                    </div>

                </div>
            </div>
        )
    else
        return <></>
}
