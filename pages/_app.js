import '../styles/globals.css'
import PageLayout from "../components/layout/PageLayout";

export default function SisAeb({ Component, pageProps}){
    return (
        <PageLayout>
            <Component {...pageProps}/>
        </PageLayout>
    )
}