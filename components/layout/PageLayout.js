import styles from '../../styles/shared/Layout.module.css'
import Cookies from 'universal-cookie/lib'
import Navigation from "../modules/navigation/Navigation";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import 'fontsource-roboto';

const cookies = new Cookies()

export default function PageLayout({children}) {

    const [dark, setDark] = useState(false)
    const router = useRouter()
    const {locale} = router
    const [reduced, setReduced] = useState(true)

    useEffect(() => {
        setDark(cookies.get('theme') === '0')

        if (locale !== cookies.get('lang') && cookies.get('lang') !== undefined)
            router.push(router.pathname, router.pathname, {locale: cookies.get('lang')}).catch(error => console.log(error))
    }, [router.isReady, router.locale])

    if (router.pathname !== '/authenticate')
        return (
            <div style={{fontFamily: 'Roboto', backgroundColor: '#eeeef1'}}>
                <div className={styles.page_container}
                     id={'scrollableDiv'} style={{
                    width: reduced ? 'calc(100% - 75px)' : 'calc(100% - 250px)',
                    marginLeft: 'auto',
                    transition: '250ms ease-in-out'
                }}>

                    {children}
                </div>
                <Navigation dark={dark} locale={router.locale} path={router.pathname} reduced={reduced}
                            setReduced={setReduced} query={router.query}/>

            </div>
        )
    else
        return (
            <div style={{fontFamily: 'Roboto'}}>
                {children}
            </div>
        )
}