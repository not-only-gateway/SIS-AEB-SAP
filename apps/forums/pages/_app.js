import '../styles/globals.css'
import PageLayout from "../components/shared/PageLayout";
import Router from 'next/router';
import {useEffect, useState} from "react"; //styles of nprogress


export default function SisAeb({Component, pageProps}) {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Router.events.on('routeChangeStart', () => {
            // if (typeof window !== 'undefined' && process.browser) {
            //     const root = document.getElementById('scrollableDiv')
            //     if (root !== null)
            //         root.style.background = 'white'
            //         }
            setLoading(true)
        })
        Router.events.on('routeChangeComplete', () => setLoading(false))
    })
    return (
        <PageLayout loading={loading}>
            <Component {...pageProps}/>
        </PageLayout>
    )
}