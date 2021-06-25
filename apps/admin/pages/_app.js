import '../styles/globals.css'
import PageLayout from "../components/shared/PageLayout";
import Router from 'next/router';
import {useEffect, useState} from "react"; //styles of nprogress


export default function SisAeb({Component, pageProps}) {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Router.events.on('routeChangeStart', () => setLoading(true))
        Router.events.on('routeChangeComplete', () => setLoading(false))
    })
    return (
        <PageLayout loading={loading}>
            {props => (
                <div >
                    <Component {...pageProps} searchInput={props.searchInput} notSearched={props.notSearched} setNotSearched={props.setNotSearched}/>
                </div>

                )}
        </PageLayout>
    )
}