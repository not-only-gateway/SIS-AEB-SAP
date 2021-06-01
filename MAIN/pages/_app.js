import '../styles/globals.css'
import PageLayout from "../components/layout/PageLayout";
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