import React, {useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import IndexPT from "../packages/locales/IndexPT";

import Canvas from "../components/shared/canvas/Canvas";
import Cookies from "universal-cookie/lib";

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
            {/*{openForm ? null :*/}
                {/*    <Header title={lang.title}/>*/}
                {/*}*/}

            <Canvas
                options={{
                    move: (new Cookies()).get('jwt') !== undefined,
                    edit: (new Cookies()).get('jwt') !== undefined,
                    show: true
                }}
                onSave={data => {
                    null
                }}
            />
        </>
    )
}
