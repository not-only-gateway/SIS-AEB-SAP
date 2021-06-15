import '../styles/globals.css'
import PageLayout from "../components/shared/layout/PageLayout";
import Router from 'next/router';
import {useEffect, useState} from "react"; //styles of nprogress


// Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());
export default function SisAeb({Component, pageProps}) {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Router.events.on('routeChangeStart', () => setLoading(true))
        Router.events.on('routeChangeComplete', () => setLoading(false))
    })
    return (
        <PageLayout children={<Component {...pageProps}/>} loading={loading}/>
    )
}