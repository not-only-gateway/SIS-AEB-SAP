import '../styles/globals.css'
import PageLayout from "../components/layout/PageLayout";
import {useEffect} from "react";
import fetchPerson from "../utils/fetch/FetchPerson";
import fetchMemberByToken from "../utils/fetch/FetchMemberByToken";
import Cookies from "universal-cookie/lib";
// import NProgress from 'nprogess'
// import Router from 'next'
// Router.events.on('routeChangeStart', () => NProgress.start());
// Router.events.on('routeChangeComplete', () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done());

export default function SisAeb({Component, pageProps}) {

    return (
        <PageLayout>
            <Component {...pageProps}/>
        </PageLayout>
    )
}