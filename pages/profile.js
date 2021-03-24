import React, {useEffect, useState} from 'react'
import Cookies from "universal-cookie/lib";
import {Button} from "@material-ui/core";
import styles from '../styles/form/Form.module.css'
import axios from "axios";
import Host from "../config/Host";

import PersonProfileForm from "../components/form/PersonProfileForm";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import {useRouter} from "next/router";
import PersonUnityForm from "../components/form/PersonUnityForm";

const cookies = new Cookies()

export default function profile(){

    const [changed, setChanged] = useState(false)
    const router = useRouter()
    const {id} = router.query
    const [dark, setDark] =  useState(false)
    const disabled = (new Cookies()).get('adm_token') !== undefined

    useEffect(() => {
        setDark(cookies.get('theme') === '0')

        //needs dark first before setting background
        setSelect({
            width: '32%',
            backgroundColor: (dark ? '#f7f8fa': '#272e38'),
        })
        setMedium({width: '22vw', backgroundColor: (dark ? '#f7f8fa': '#272e38')})
        setSmall({width: '32%', backgroundColor: (dark ? '#f7f8fa': '#272e38')})
    }, [])

    const handleChangeProfile = (event) => {
        profile[event.target.name] = event.target.value

        if(!changed)
            setChanged(true)
    }

    const saveChanges = async() => {

    }

    const [smallFieldContainer, setSmall]=useState(null)

    const [mediumFieldContainer, setMedium]=useState(null)

    const [selectFieldContainer, setSelect]=useState(null)

    return(
        <>
            <Head>
                <title>{profile?.name}</title>
            </Head>
            <Layout>
                {() => (
                    <div style={{height: '100%', overflowX: 'hidden',overflowY: 'auto'}}>
                        <div style={{margin: 'auto', width: '45vw'}}>
                            <p style={{fontSize:'1.7rem', fontWeight:'550', textAlign: 'left'}}> Profile</p>
                            <p style={{fontSize:'.9rem',textAlign: 'left'}}>Info about profile</p>
                        </div>
                        <div className={styles.container} >
                            <PersonProfileForm handleChange={handleChangeProfile}
                                               dark={dark}
                                               smallFieldContainer={smallFieldContainer}
                                               mediumFieldContainer={mediumFieldContainer}
                                               selectFieldContainer={selectFieldContainer}
                                               disabled={disabled}
                                               id={id}
                            />
                            <PersonUnityForm dark={dark}
                                             smallFieldContainer={smallFieldContainer}
                                             mediumFieldContainer={mediumFieldContainer}
                                             selectFieldContainer={selectFieldContainer}
                                             disabled={disabled}
                                             id={id}
                            />
                            <div className={styles.from_buttons_container}>
                                <div className={styles.form_row}>
                                    <Button disabled={!changed}>Save</Button>
                                    <Button disabled={!changed}>Discard</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                )
                }
            </Layout>
        </>

    )
}