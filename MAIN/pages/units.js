import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import mainStyles from '../styles/shared/Main.module.css'
import HeaderLayout from "../components/layout/HeaderLayout";
import UnitsStructure from "../components/modules/structure/UnitsStructure";

export default function Index() {

    const router = useRouter()
    const [lang, setLang] = useState(null)

    useEffect(() => {
        setLang(getLanguage(router.locale, '/units'))
    }, [])

    if (lang !== null)
        return (
            <>
                <HeaderLayout
                    width={'calc(100% - 64px)'}
                    pageTitle={lang.title}
                    title={lang.title}
                    information={lang.information}

                />
                <div className={mainStyles.displayInlineCenter}
                     style={{width: '90%', position: 'relative', margin: 'auto'}}>
                    <UnitsStructure/>
                </div>

            </>
        )
    else
        return <></>
}