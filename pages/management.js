import React, {useEffect, useRef, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import mainStyles from '../styles/shared/Main.module.css'
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/elements/TabContent";
import Authenticate from "../components/modules/Authenticate";
import AccessProfileList from "../components/templates/AccessProfileList";
import axios from "axios";
import Host from "../utils/shared/Host";
import {Button} from "@material-ui/core";
import animations from "../styles/shared/Animations.module.css";
import {ArrowBackRounded, HistoryRounded} from "@material-ui/icons";
import {getIconStyle, getPrimaryColor, getSecondaryColor} from "../styles/shared/MainStyles";
import Link from "next/link";
import GetTab from "../utils/management/GetTab";

export default function management() {

    const router = useRouter()

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

    const [openTab, setOpenTab] = useState(0)
    const [valid, setValid] = useState(false)

    const [option, setOption] = useState(null)

    const buttonContainer = {
        height: '65px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textTransform: 'none', width: '31%',
        border: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
        borderRadius: '8px',
        opacity: 0,
    }
    useEffect(() => {

            if (lang === null)
                setLang(getLanguage(router.locale, router.pathname))
            if (accessProfile === null)
                readAccessProfile().then(res => setAccessProfile(res))

        }, [router.locale]
    )

    function getInfo() {
        let response = undefined
        switch (option) {
            case 0: {
                response = lang.accessTitle
                break
            }
            case 1: {
                response = lang.effectiveRoleTitle
                break
            }
            case 2: {
                response = lang.commissionedRoleTitle
                break
            }
            case 3: {
                response = lang.linkagesTitle
                break
            }
            default:
                break
        }
        return response
    }

    if (lang !== null)
        return (
            <>
                <Authenticate
                    valid={(valid) || (new Cookies()).get('authorization_token') !== undefined}
                    setValid={setValid}
                    redirect={() => {
                        router.push('/', '/', {locale: router.locale})
                    }}
                    locale={router.locale}
                />
                <HeaderLayout
                    availableTabs={option !== null ? {
                        tabs: [
                            {
                                disabled: false,
                                key: 0,
                                value: lang.list
                            },
                            accessProfile !== null ? {
                                disabled: !accessProfile.canCreateAccessProfile,
                                key: 1,
                                value: lang.create
                            } : null
                        ],
                        setOpenTab: setOpenTab,
                        openTab: openTab
                    } : undefined}
                    filterComponent={undefined}
                    title={
                        lang.title
                    }
                    pageTitle={lang.title}
                    information={getInfo()}
                    searchComponent={undefined}
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
                    <div style={{width: '75%'}}>
                        <div style={{
                            display: option === null ? 'none' : null,
                            position: 'sticky',
                            top: 0,
                            width: '100%',
                            marginTop: '25px'
                        }}>
                            <Button style={{backgroundColor: 'black', color: 'white', marginLeft: 'auto', width: '65px', height: '30px'}}
                                    onClick={() => setOption(null)}><ArrowBackRounded/></Button>
                        </div>
                        <div className={mainStyles.displayWarp}
                             style={{marginTop: '50px', width: '100%', display: option === null ? null : 'none'}}>
                            <Button style={{...buttonContainer, ...{animationDelay: '100ms'}}}
                                    className={animations.slideUpAnimation} onClick={() => setOption(0)}>
                                <p className={mainStyles.secondaryParagraph}
                                   style={getSecondaryColor({dark: false})}>{lang.accessTitle}</p>
                            </Button>
                            <Button style={{...buttonContainer, ...{animationDelay: '200ms'}}}
                                    className={animations.slideUpAnimation} onClick={() => setOption(1)}>
                                <p className={mainStyles.secondaryParagraph}
                                   style={getSecondaryColor({dark: false})}>{lang.effectiveRoleTitle}</p>
                            </Button>
                            <Button style={{...buttonContainer, ...{animationDelay: '300ms'}}}
                                    className={animations.slideUpAnimation} onClick={() => setOption(2)}>
                                <p className={mainStyles.secondaryParagraph}
                                   style={getSecondaryColor({dark: false})}>{lang.commissionedRoleTitle}</p>
                            </Button>
                            <Button style={{...buttonContainer, ...{animationDelay: '400ms'}}}
                                    className={animations.slideUpAnimation} onClick={() => setOption(3)}>
                                <p className={mainStyles.secondaryParagraph}
                                   style={getSecondaryColor({dark: false})}>{lang.linkagesTitle}</p>
                            </Button>
                        </div>
                        <div style={{display: option === null ? 'none' : null}}>
                            <TabContent
                                openTab={openTab}
                                tabs={GetTab({option: option, locale: router.locale})}
                            />
                        </div>

                    </div>
                </div>
            </>


        )
    else
        return <></>
}
