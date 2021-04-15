import styles from '../../../styles/shared/Layout.module.css'
import Cookies from 'universal-cookie/lib'
import Navigation from "../navigation/Navigation";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {setThemeCookie} from "../../../utils/shared/Theme";
import Head from "next/head";
import PropTypes from 'prop-types'
import {
    getPrimaryBackground,
    getPrimaryColor,
    getSecondaryBackground,
    getSecondaryColor, getTertiaryColor
} from "../../../styles/shared/MainStyles";
import mainStyles from '../../../styles/shared/Main.module.css'

const cookies = new Cookies()

export default function Layout({children}) {

    const [dark, setDark] = useState(false)
    const router = useRouter()
    const {locale} = router

    useEffect(() => {
        setDark(cookies.get('theme') === '0')

        if (locale !== cookies.get('lang') && cookies.get('lang') !== undefined)
            router.push(router.pathname, router.pathname, {locale: cookies.get('lang')}).catch(error => console.log(error))
    }, [router.isReady, router.locale])

    const changeTheme = () => {
        setDark(!dark)
        setThemeCookie()
    }

    const getTitle = (props) => {
        return (
            <div style={{marginBottom: '2vh'}}>
                {props.pageName !== undefined ?
                    <Head>
                        <title>{props.pageName}</title>
                    </Head> : null}
                <div style={{margin: 'auto', width: '45vw'}}>
                    <p style={getPrimaryColor({dark: dark})} className={mainStyles.primaryHeader}>{props.pageTitle}</p>
                    <p className={mainStyles.secondaryParagraph} style={getTertiaryColor({dark: dark})}>{props.pageInfo}</p>
                </div>
            </div>
        )
    }

    getTitle.propTypes = {
        pageTitle: PropTypes.string,
        pageName: PropTypes.string,
        pageInfo: PropTypes.string
    }

    return (
        <>
            <div className={styles.page_container} style={getSecondaryBackground({dark: dark})}
                 id={'scrollableDiv'}>
                <div className={styles.children_container}>
                    {router.pathname === '/settings' ?
                        children({dark, changeTheme, getTitle, locale})
                        :
                        children({dark, getTitle})
                    }
                </div>
            </div>
            <div style={getPrimaryBackground({dark: dark})} className={styles.left}>
                <Navigation dark={dark} locale={router.locale} path={router.pathname}/>
            </div>
        </>
    )
}