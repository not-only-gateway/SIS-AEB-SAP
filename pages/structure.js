import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import axios from "axios";
import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import mainStyles from '../styles/shared/Main.module.css'
import Canvas from "../components/layout/Canvas";
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";

export default function Structure() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [topUnits, setTopUnits] = useState([])
    const [topCollaborators, setTopCollaborators] = useState([])
    const [dark, setDark] = useState(false)
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        setLang(getLanguage(router.locale, '/units'))
        setDark((new Cookies()).get('theme') === 0)



    }, [])

    if (lang !== null)
        return (
            <>
                <HeaderLayout
                    width={'75%'}
                    filterComponent={undefined} pageTitle={lang.title} title={lang.title}
                    information={lang.information}
                    searchComponent={undefined}
                    availableTabs={{
                        tabs: [
                            {
                                disabled: false,
                                key: 0,
                                value: lang.units
                            },
                            {
                                disabled: false,
                                key: 1,
                                value: lang.collaborators
                            },
                            // {
                            //     disabled: false,
                            //     key: 2,
                            //     value: 'Estrutura organizacional'
                            // },
                        ],
                        setOpenTab: setOpenTab,
                        openTab: openTab
                    }}
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
                        <TabContent
                            openTab={openTab}
                            tabs={[
                                {
                                    buttonKey: 0,
                                    value: (
                                        topUnits.map((unit, index) => (
                                            <>
                                                {index === 0 ?
                                                    <Canvas dark={dark} type={'unit'} subject={unit}/> : null}
                                            </>
                                        ))
                                    )
                                },

                                {
                                    buttonKey: 1,
                                    value: (
                                        topCollaborators.map((collaborator, index) => (
                                            <>
                                                {index === 0 ?
                                                    <Canvas dark={dark} type={'collaborator'} subject={collaborator}/>
                                                    :
                                                    null
                                                }
                                            </>
                                        ))
                                    )
                                },
                                {
                                    buttonKey: 2,
                                    value: null

                                },

                            ]}/>
                    </div>
                </div>
            </>
        )
    else
        return <></>
}
