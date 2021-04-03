import React, {useEffect, useState} from 'react'
import Cookies from "universal-cookie/lib";
import {createMuiTheme} from "@material-ui/core";
import Layout from "../components/shared/Layout";
import {useRouter} from "next/router";
import Collaborations from "../components/person/Collaborations";
import {ThemeProvider} from "@material-ui/styles";
import axios from "axios";
import Host from "../utils/Host";
import BasicForm from "../components/person/BasicForm";
import ContactForm from "../components/person/ContactForm";
import AddressForm from "../components/shared/form/AddressForm";
import DocumentsForm from "../components/person/DocumentsForm";

const cookies = new Cookies()

export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)
    const disabled = (new Cookies()).get('adm_token') !== undefined
    const [dark, setDark] = useState(false)

    useEffect(() => {

        setDark(cookies.get('theme') === '0')
        setId(router.query.id)
    }, [])

    async function fetchData(path, params) {
        let response = null
        try {
            await axios({
                method: 'get',
                url: Host() + path,
                headers: {'authorization': cookies.get('jwt')},
                params: params
            }).then(res => {
                response = res.data
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }

        return response
    }

    async function saveChanges(path, params, method) {
        let response = false
        try {
            await axios({
                method: method,
                url: Host() + path,
                headers: {'authorization': cookies.get('jwt')},
                data: params
            }).then(() => {
                response = true
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
        return response
    }

    return (
        <Layout>
            {props =>
                <ThemeProvider theme={createMuiTheme({
                    palette: {
                        type: dark ? "dark" : "light"
                    }
                })}>
                    <props.getTitle pageName={'Person'} pageTitle={'Person'} pageInfo={'INFORMATION'}/>
                    {id !== undefined ?
                        <div>
                            <BasicForm
                                id={id}
                                saveChanges={saveChanges}
                                fetchData={fetchData}
                                dark={dark}
                                disabled={disabled}/>
                            <Collaborations
                                id={id}
                                saveChanges={saveChanges}
                                fetchData={fetchData}
                                dark={dark}
                                disabled={disabled}
                            />
                            <ContactForm
                                id={id}
                                saveChanges={saveChanges}
                                fetchData={fetchData}
                                dark={dark}
                                disabled={disabled}
                            />
                            <AddressForm
                                id={id}
                                saveChanges={saveChanges}
                                fetchData={fetchData}
                                dark={dark}
                                disabled={disabled}/>
                            <DocumentsForm
                                id={id}
                                saveChanges={saveChanges}
                                fetchData={fetchData}
                                dark={dark}
                                disabled={disabled}/>
                        </div>
                        :
                        null
                    }
                </ThemeProvider>
            }
        </Layout>


    )
}