import styles from '../../styles/shared/Layout.module.css'
import Cookies from 'universal-cookie/lib'
import Navigation from "../modules/navigation/Navigation";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"
import fetchMemberByToken from "../../utils/fetch/FetchMemberByToken";
import fetchMainCollaboration from "../../utils/fetch/FetchMainCollaboration";

const cookies = new Cookies()

export default function PageLayout({children}) {


    const router = useRouter()
    const {locale} = router
    const [reduced, setReduced] = useState(true)

    useEffect(() => {
        if ((new Cookies()).get('jwt') !== undefined) {
            fetchMemberByToken().then(res => {
                if (res !== null) {
                    sessionStorage.setItem('profile', JSON.stringify(res.person))
                    if(sessionStorage.getItem('collaboration') === null)
                        sessionStorage.setItem('collaboration', JSON.stringify(res.main_collaboration))
                }
            })


        }

        if (locale !== cookies.get('lang') && cookies.get('lang') !== undefined)
            router.push(router.pathname, router.pathname, {locale: cookies.get('lang')}).catch(error => console.log(error))
    }, [router.isReady, router.locale])

    if (router.pathname !== '/authenticate')
        return (
            <div style={{fontFamily: 'Roboto !important', backgroundColor: 'white'}}>
                <div className={styles.pageContentContainer}
                     id={'scrollableDiv'} style={{
                    width: reduced ? 'calc(100% - 75px)' : 'calc(100% - 250px)',
                    marginLeft: 'auto',
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