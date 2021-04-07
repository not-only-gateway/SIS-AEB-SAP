import styles from '../../styles/Layout.module.css'
import Cookies from 'universal-cookie/lib'
import Navigation from "./navigation/Navigation";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {setThemeCookie} from "../../utils/Theme";
import Head from "next/head";
import PropTypes from 'prop-types'

const cookies = new Cookies()

export default function Layout({children}) {

    const [dark, setDark] = useState(false)
    const router = useRouter()
    const {locale} = router

    useEffect(() => {
        setDark(cookies.get('theme') === '0')

        if (locale !== cookies.get('lang') && cookies.get('lang') !== undefined)
            router.push(router.pathname, router.pathname, {locale: cookies.get('lang')}).catch(error => console.log(error))
    }, [])

    const changeTheme = () => {
        setDark(!dark)
        setThemeCookie()
    }

    const getTitle = (props) => {
        return (
            <div style={{marginBottom: '2vh'}}>
                <Head>
                    <title>{props.pageName}</title>
                </Head>
                <div style={{margin: 'auto', width: '45vw'}}>
                    <p style={{fontSize: '1.7rem', fontWeight: '550', textAlign: 'left'}}>{props.pageTitle}</p>
                    <p style={{fontSize: '.85rem', textAlign: 'left'}}>{props.pageInfo}</p>
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
        <div style={{color: dark ? 'white' : 'black'}}>
            <div className={styles.page_container} style={{backgroundColor: !dark ? 'white' : '#303741'}} id={'scrollableDiv'}>
                <div className={styles.children_container}>
                    {router.pathname === '/settings' ?
                        children({dark, changeTheme, getTitle, locale})
                        :
                        children({dark, getTitle})
                    }
                </div>
            </div>
            <div style={{backgroundColor: !dark ? '#f4f8fb' : '#262d37'}} className={styles.left}>
                <Navigation dark={dark} locale={locale} path={router.pathname}/>
            </div>
        </div>
    )
}