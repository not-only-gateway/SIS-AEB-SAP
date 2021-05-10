import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Button, Divider, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {getLanguage, setCookiesLanguage} from "../utils/shared/PageLanguage";
import Cookies from "universal-cookie/lib";
import Accordion from "../components/layout/Accordion";
import fetchSettingsData from "../utils/fetch/FetchSettings";
import {readAccessProfile, readCollaboration} from "../utils/shared/IndexedDB";
import shared from '../styles/shared/Shared.module.css'
import {getSecondaryColor, getTertiaryColor} from "../styles/shared/MainStyles";
import mainStyles from '../styles/shared/Main.module.css'
import Link from "next/link";
import {HistoryRounded} from "@material-ui/icons";
import animations from "../styles/shared/Animations.module.css";
import HeaderLayout from "../components/layout/HeaderLayout";
import mapToSelect from "../utils/shared/MapToSelect";
import Selector from "../components/modules/selector/Selector";

export default function Settings() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [collaborations, setCollaborations] = useState([])
    const [currentCollaboration, setCurrentCollaboration] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [dark, setDark] = useState(false)
    useEffect(() => {
        setDark((new Cookies()).get('theme') === 0)
        if (collaborations.length === 0) {
            readCollaboration().then(res => {
                if (res !== null) {
                    setCurrentCollaboration(res)
                    fetchSettingsData().then(res => setCollaborations(res))
                }
            })
        }
        if (accessProfile === null)
            readAccessProfile().then(res => setAccessProfile(res))
        setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale, router.isReady])


    function changeLanguage(event) {
        const newLocale = event.target.value
        const newLang = getLanguage(newLocale, '/settings')
        setCookiesLanguage(newLocale)

        router.push('/settings', '/settings', {locale: newLocale})

        setLang(newLang)
    }

    if (lang !== null)
        return (
            <>
                <HeaderLayout


                    pageTitle={lang.settings}
                    title={lang.settings}
                    information={lang.information}
                    width={'75%'}
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
                    <div style={{
                        marginTop: '50px',
                        width: '75%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        gap: '16px'
                    }}>
                        <Accordion
                            content={
                                <FormControl component="fieldset"
                                             style={{...{paddingLeft: '10px'}, ...getSecondaryColor({dark: dark})}}>
                                    <RadioGroup onChange={changeLanguage}
                                                value={router.locale}>
                                        {[{value: 'Português', key: 'pt'}, {
                                            value: 'English',
                                            key: 'en'
                                        }, {value: 'Español', key: 'es'}].map(choice => {
                                            return <FormControlLabel value={choice.key} control={<Radio/>}
                                                                     label={choice.value}/>
                                        })}
                                    </RadioGroup>
                                </FormControl>
                            }
                            summary={
                                <div className={shared.accordionTitle}>
                                    <p className={mainStyles.secondaryParagraph}>{lang.language}</p>
                                    <Divider style={{width: '10px', marginLeft: '10px', marginRight: '10px'}}
                                             orientation={'horizontal'}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark: dark})}>{router.locale === 'pt' ? 'Português' : router.locale === 'es' ? 'Español' : 'English'}</p>
                                </div>
                            }
                            key={'language - settings'}
                            closedSize={31}
                            openSize={31}
                            animationDelay={100}
                            dark={dark}
                        />


                        {(new Cookies()).get('jwt') !== undefined && currentCollaboration !== null ?
                            <Selector
                                required={false} key={'collaboration-setting'} handleChange={undefined}
                                setChanged={undefined} disabled={false} selected={{
                                key: currentCollaboration.id,
                                value: <div className={mainStyles.displayInlineSpaced}
                                            style={{width: '100%', padding: '16px', height: '56px'}}>
                                    <p>{currentCollaboration.unitAcronym}</p>
                                    <p>{currentCollaboration.roleInformation}</p>
                                </div>
                            }}
                                data={mapToSelect({data: collaborations, option: 7})}
                                label={'Collaboration'}
                                width={'31%'}
                            />
                            // <Accordion
                            //     content={
                            //         <>
                            //             <Authenticate
                            //                 redirect={() => {
                            //                     window.location.reload()
                            //                 }}
                            //                 render={true}
                            //                 locale={router.locale}
                            //             />
                            //             <FormControl component="fieldset"
                            //                          style={{...{paddingLeft: '10px'}, ...getSecondaryColor({dark: dark})}}>
                            //                 <RadioGroup value={currentCollaboration.id} onChange={(event => alert(event.target.value))}>
                            //                     {collaborations.map(collaboration => {
                            //                         return <FormControlLabel
                            //                             value={collaboration.collaboration.id}
                            //                             control={<Radio/>}
                            //                             label={<div className={mainStyles.displayInlineSpaced} >
                            //                                 <p>{collaboration.unit.acronym}</p>
                            //                                 <p>{collaboration.role.denomination}</p>
                            //                                 <p>{collaboration.linkage.denomination}</p>
                            //                             </div>}
                            //                         />
                            //                     })}
                            //                 </RadioGroup>
                            //             </FormControl>
                            //         </>
                            //     }
                            //     summary={
                            //         <div className={shared.accordionTitle}>
                            //             <p className={mainStyles.secondaryParagraph}>{lang.collaboration}</p>
                            //             <Divider style={{width: '10px', marginLeft: '10px', marginRight: '10px'}}
                            //                      orientation={'horizontal'}/>
                            //             <p className={mainStyles.tertiaryParagraph}
                            //                style={getTertiaryColor({dark: dark})}>{currentCollaboration.unitAcronym}</p>
                            //         </div>
                            //     }
                            //     key={'collaborations-settings'}
                            //     closedSize={31}
                            //     openSize={31}
                            //     dark={dark}
                            //     animationDelay={300}
                            // />
                            :
                            null
                        }
                        {(new Cookies()).get('jwt') !== undefined ?

                            <Link href={{pathname: '/activity', locale: router.locale}}>
                                <Button style={{
                                    height: '65px',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    textTransform: 'none', width: '31%',
                                    borderRadius: '8px',
                                    opacity: 0,
                                    animationDelay: '400ms',
                                    backgroundColor: 'white',
                                    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
                                }} className={animations.slideUpAnimation}>

                                    <HistoryRounded
                                        style={{marginRight: 0, fontSize: '1.5rem', color: '#262626'}}/>
                                    <Divider style={{width: '10px', marginLeft: '10px', marginRight: '10px'}}
                                             orientation={'horizontal'}/>
                                    <p className={mainStyles.secondaryParagraph}
                                       style={{color: '#777777'}}>{lang.activity}</p>
                                </Button>
                            </Link>
                            :
                            null
                        }
                    </div>
                </div>
            </>

        )
    else
        return <></>
}
