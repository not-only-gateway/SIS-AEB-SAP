import React, {useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import IndexPT from "../packages/locales/IndexPT";
import {Header} from 'sis-aeb-misc'

export default function index(props) {
    const lang = IndexPT
    const router = useRouter()
    const [openForm, setOpenForm] = useState(false)
    return (
        <>
            <Head>
                <title>{lang.title}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <div style={{width: '65%', margin: 'auto', overflowY: 'hidden', marginTop: '32px'}}>
                {openForm ? null :
                    <Header title={lang.title}/>
                }
            </div>
        </>
    )
}
