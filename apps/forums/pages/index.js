import React from 'react'
import Head from "next/head";
import IndexPT from "../packages/locales/IndexPT";

import Canvas from "../components/shared/canvas/Canvas";
import Cookies from "universal-cookie/lib";

export default function index(props) {
    const lang = IndexPT

    return (
        <>
            <Head>
                <title>{lang.title}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
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
