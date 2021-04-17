import Layout from "../components/shared/layout/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from '../styles/Structure.module.css'
import {createMuiTheme, Divider, ThemeProvider} from "@material-ui/core";
import {getLanguage} from "../utils/shared/Language";
import axios from "axios";
import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import SubjectLayout from "../components/structure/SubjectLayout";
import AccordionLayout from "../components/shared/layout/AccordionLayout";
import mainStyles from '../styles/shared/Main.module.css'
import shared from "../styles/shared/Shared.module.css";
import {getIconStyle, getTertiaryColor} from "../styles/shared/MainStyles";
import {ExtensionRounded, GroupRounded, ViewQuiltRounded} from "@material-ui/icons";

export default function Structure() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [topUnits, setTopUnits] = useState([])
    const [topCollaborators, setTopCollaborators] = useState([])

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

        axios({
            method: 'get',
            url: Host() + 'top/collaborators',
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            setTopCollaborators(res.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    if (lang !== null)
        return (
            <Layout>
                {props =>
                    <ThemeProvider theme={createMuiTheme({
                        palette: {
                            type: props.dark ? "dark" : "light"
                        }
                    })}>
                        <div style={{position: 'relative', marginRight: 'auto'}}>
                            <props.getTitle pageName={lang.title} pageTitle={lang.title} pageInfo={lang.information}/>
                        </div>
                        <div className={styles.tree_container}>
                            <AccordionLayout
                                content={topUnits.map((unit, index) => {
                                    if (index === 0)
                                        return (
                                            <ul className={styles.tree} style={{
                                                backgroundColor: props.dark ? '#3b424c' : 'none',
                                                borderRadius: '8px',
                                                margin: 'auto'
                                            }}>
                                                <SubjectLayout dark={props.dark} subject={unit}
                                                               type={'unit'}/>
                                            </ul>
                                        )
                                    else return null
                                })}
                                summary={
                                    <div className={shared.accordionTitle}>
                                        <ViewQuiltRounded style={getIconStyle({dark: props.dark})}/>
                                        <Divider style={{width: '10px', marginRight: '10px'}} orientation={'horizontal'}/>
                                        <p className={mainStyles.secondaryParagraph}>{lang.units}</p>
                                    </div>
                                }
                                dark={props.dark}
                                closedSize={45}
                                openSize={null}
                            />

                        </div>
                        <div className={styles.tree_container}>
                            <AccordionLayout
                                content={topCollaborators.map((collaborator, index) => {
                                    if (index === 0)
                                        return (
                                            <ul className={styles.tree} style={{
                                                backgroundColor: props.dark ? '#3b424c' : 'none',
                                                borderRadius: '8px',
                                                margin: 'auto'
                                            }}>
                                                <SubjectLayout dark={props.dark}
                                                               subject={collaborator} type={'collaborator'}/>
                                            </ul>
                                        )
                                    else return null
                                })}
                                summary={
                                    <div className={shared.accordionTitle}>
                                        <ExtensionRounded style={getIconStyle({dark: props.dark})}/>
                                        <Divider style={{width: '10px', marginRight: '10px'}} orientation={'horizontal'}/>
                                        <p className={mainStyles.secondaryParagraph}>{lang.collaborators}</p>
                                    </div>
                                }
                                dark={props.dark}
                                closedSize={45}
                                openSize={null}
                            />

                        </div>
                    </ThemeProvider>
                }
            </Layout>
        )
    else
        return <></>
}