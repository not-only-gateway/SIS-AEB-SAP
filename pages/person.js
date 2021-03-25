import React, {useEffect, useState} from 'react'
import Cookies from "universal-cookie/lib";
import {Button, createMuiTheme} from "@material-ui/core";
import styles from '../styles/form/Form.module.css'
import axios from "axios";
import Host from "../config/Host";

import ProfileForm from "../components/forms/person/ProfileForm";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import {useRouter} from "next/router";
import CollaboratorForm from "../components/forms/person/CollaboratorForm";
import {ThemeProvider} from "@material-ui/styles";

const cookies = new Cookies()

export default function person(){

    const [changed, setChanged] = useState(false)
    const router = useRouter()
    const {id} = router.query
    const [dark, setDark] =  useState(false)
    const disabled = (new Cookies()).get('adm_token') !== undefined

    useEffect(() => {
        setDark(cookies.get('theme') === '0')
    }, [])

    const handleChangeProfile = (event) => {
        person[event.target.name] = event.target.value

        if(!changed)
            setChanged(true)
    }

    const saveChanges = async() => {

    }

    return(
        <ThemeProvider theme={createMuiTheme({
            palette: {
                type: dark ? "dark" : "light"
            }
        })}>
            <Head>
                <title>{person?.name}</title>
            </Head>
            <Layout>
                {() => (
                    <div style={{height: '100%', overflowX: 'hidden',overflowY: 'auto'}}>
                        <div style={{margin: 'auto', width: '45vw'}}>
                            <p style={{fontSize:'1.7rem', fontWeight:'550', textAlign: 'left'}}> Profile</p>
                            <p style={{fontSize:'.9rem',textAlign: 'left'}}>Info about profile</p>
                        </div>
                        <div className={styles.container} >
                            <ProfileForm handleChange={handleChangeProfile}
                                         dark={dark}
                                         disabled={disabled}
                                         id={id}
                            />
                            <CollaboratorForm dark={dark}
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
        </ThemeProvider>

    )
}