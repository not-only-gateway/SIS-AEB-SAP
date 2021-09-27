import '../styles/globals.css'
import PageLayout from "../components/shared/PageLayout";
import Router from 'next/router';
import {useEffect, useState} from "react"; //templates of nprogress


export default function _app({Component, pageProps}) {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Router.events.on('routeChangeStart', () => {
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