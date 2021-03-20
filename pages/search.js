import Head from 'next/head'
import Layout from "../components/layout/Layout";
import shared from "../styles/Shared.module.css";
import React from "react";

export default function Search() {
    return (
        <Layout>
            {props => (
                <div className={shared.content_container} style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
                    <p>LOGRSDKLasjdldksjasdl</p>
                </div>
            )
            }

        </Layout>
    )
}
