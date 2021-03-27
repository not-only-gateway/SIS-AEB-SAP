import React from 'react'
import Cookies from "universal-cookie/lib";
import {createMuiTheme} from "@material-ui/core";
import styles from '../styles/form/Form.module.css'

import ProfileForm from "../components/forms/person/ProfileForm";
import Layout from "../components/layout/Layout";
import {useRouter} from "next/router";
import CollaboratorForm from "../components/forms/person/CollaboratorForm";
import {ThemeProvider} from "@material-ui/styles";

export default function person() {

    const router = useRouter()
    const {id} = router.query
    const disabled = (new Cookies()).get('adm_token') !== undefined

    return (
        <Layout>
            {props =>
                <ThemeProvider theme={createMuiTheme({
                    palette: {
                        type: props.dark ? "dark" : "light"
                    }
                })}>
                    <props.getTitle pageName={'Person'} pageTitle={'Person'} pageInfo={'INFORMATION'}/>
                    <div>
                        <ProfileForm
                            dark={props.dark}
                            disabled={disabled}
                            id={id}
                        />
                        <CollaboratorForm
                            dark={props.dark}
                            disabled={disabled}
                            id={id}
                        />
                    </div>
                </ThemeProvider>
            }
        </Layout>


    )
}