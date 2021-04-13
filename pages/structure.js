import Layout from "../components/shared/layout/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from '../styles/Structure.module.css'
import PersonCard from "../components/index/PersonCard";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {getLanguage} from "../utils/shared/Language";
import axios from "axios";
import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import UnitLayout from "../components/structure/UnitLayout";
import AccordionLayout from "../components/shared/layout/AccordionLayout";


export default function Structure() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [topUnits, setTopUnits] = useState([])

    useEffect(() => {
        setLang(getLanguage(router.locale, '/structure'))
        axios({
            method: 'get',
            url: Host() + 'top/units',
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            setTopUnits(res.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    function redirect(id) {
        router.push('/unit', '/unit', {locale: router.locale, query: id})
    }

    if (lang !== null)
        return (
            <Layout>
                {props =>
                    <ThemeProvider theme={createMuiTheme({
                        palette: {
                            type: props.dark ? "dark" : "light"
                        }
                    })}>
                        <props.getTitle pageName={lang.title} pageTitle={lang.title} pageInfo={lang.information}/>
                        <div className={styles.tree_container}>
                            <AccordionLayout
                                content={topUnits.map((unit, index) => {
                                    if (index === 0)
                                        return (
                                            <ul className={styles.tree} style={{
                                                border: !props.dark ? '#e2e2e2 1px solid' : 'none',
                                                backgroundColor: props.dark ? '#3b424c' : 'none',
                                                borderRadius: '8px',
                                                margin: 'auto'
                                            }}>
                                                <UnitLayout redirect={redirect} dark={props.dark} unit={unit}/>
                                            </ul>
                                        )
                                    else return null
                                })}
                                summary={
                                    <div>
                                        <p>{lang.units}</p>
                                    </div>
                                }
                                dark={props.dark}
                                closedSize={45}
                                openSize={75}
                            />
                        </div>

                    </ThemeProvider>
                }
            </Layout>
        )
    else
        return <></>
}