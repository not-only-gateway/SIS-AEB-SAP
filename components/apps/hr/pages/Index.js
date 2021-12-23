import React from 'react'
import Head from "next/head";

import PropTypes from 'prop-types'
import styles from '../styles/Shared.module.css'
import PersonList from "../components/lists/PersonList";

export default function Index(props) {
    return (
        <>
            <Head>
                <title>Ramais</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <div className={styles.wrapper}>
                <PersonList redirect={id => props.redirect('/sap/?page=project&id=' + id, '/sap/?page=project&id=' + id, {})}/>
            </div>
        </>
    )
}
Index.propTypes = {
    redirect: PropTypes.func
}