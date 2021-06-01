import styles from '../../styles/shared/Layout.module.css'
import Cookies from 'universal-cookie/lib'
import Navigation from "./Navigation";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"


const cookies = new Cookies()

export default function PageLayout({children}) {


    const router = useRouter()
    const {locale} = router
    const [reduced, setReduced] = useState(true)

    useEffect(() => {
        if (locale !== cookies.get('lang') && cookies.get('lang') !== undefined)
            router.push(router.pathname, router.pathname, {locale: cookies.get('lang')}).catch(error => console.log(error))
    }, [router.isReady, router.locale, router.pathname])

    if (router.pathname !== '/authenticate')
        return (
            <div style={{fontFamily: 'Roboto !important', backgroundColor: 'white'}}>
                <div className={styles.pageContentContainer}
                     id={'scrollableDiv'} style={{
                    height: 'calc(100vh - 65px)',
                    transform: 'translateY(65px)',
                    transition: '250ms ease-in-out',
                }}>

                    {children}
                </div>
                <Navigation dark={false} locale={router.locale} path={router.pathname} reduced={reduced}
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