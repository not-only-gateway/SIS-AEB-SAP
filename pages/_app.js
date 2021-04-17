import '../styles/globals.css'
import Layout from "../components/layout/Layout";

export default function SisAeb({ Component, pageProps}){
    return (
        <Layout>
            <Component {...pageProps}/>
        </Layout>
    )
}