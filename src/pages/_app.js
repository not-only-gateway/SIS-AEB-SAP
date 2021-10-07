import '../styles/globals.css'
import AppWrapper from "../components/AppWrapper";
import Router from 'next/router';
import {useEffect, useState} from "react";


export default function _app({Component, pageProps}) {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Router.events.on('routeChangeStart', () => {
            setLoading(true)
        })
        Router.events.on('routeChangeComplete', () => setLoading(false))
    })
    return (

        <AppWrapper loading={loading}>
            {(props) => <Component {...{...pageProps, ...props}}/>}
        </AppWrapper>
    )
}