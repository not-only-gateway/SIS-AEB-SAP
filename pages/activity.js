import Layout from "../components/shared/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/Language";
import Cookies from "universal-cookie/lib";
import AccordionLayout from "../components/shared/AccordionLayout";
import styles from '../styles/Activity.module.css'
import axios from "axios";
import Host from "../utils/Host";
import localIpUrl from "local-ip-url";
import {Button, Divider} from "@material-ui/core";
import shared from '../styles/Shared.module.css'
import InputLayout from "../components/shared/InputLayout";

export default function Activity() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [changed, setChanged] = useState(false)
    const [method, setMethod] = useState(null)
    const [thisMachine, setThisMachine] = useState(false)
    const [path, setPath] = useState(null)

    async function fetchData() {
        setChanged(false)
        await axios({
            method: 'get',
            url: Host() + 'activity',
            headers: {'authorization': (new Cookies()).get('jwt')},
            params: {
                start_date: startDate !== null ? startDate.getTime() : null,
                ip: thisMachine ? localIpUrl('public') : null,
                method: method,
                path: path
            }
        }).then(res => {
            setData(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    function getMethodColor(method) {
        let response = null

        switch (method) {
            case 'GET': {
                response = '#249a44'
                break
            }
            case 'POST': {
                response = '#f2ac04'
                break
            }
            case 'PUT': {
                response = '#0c74da'
                break
            }
            case 'DELETE': {
                response = '#e62214'
                break
            }
            default:
                break
        }

        return response
    }

    useEffect(() => {

        if(data.length === 0)
            fetchData().catch(error => console.log(error))

        const currentLocale = (new Cookies()).get('lang')

        if (currentLocale !== undefined && currentLocale !== router.locale) {
            router.push('/activity', '/activity', {locale: currentLocale}).catch(r => console.log(r))
            setLang(getLanguage(router.locale, router.pathname))
        } else
            setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale])

    if (lang !== null)
        return (
            <Layout>
                {props =>
                    <>
                        <div className={shared.header_container}
                             style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
                            <props.getTitle pageName={lang.title} pageTitle={lang.title} pageInfo={lang.info1}/>
                            <div className={styles.options_container}
                                 style={{border: props.dark ? null : '#e2e2e2 1px solid'}}>
                                <InputLayout inputName={'Search Path'} dark={props.dark} handleChange={setPath}
                                             inputType={0}
                                             disabled={props.disabled} size={21} initialValue={path}
                                             key={"path"} setChanged={setChanged} margin={false}
                                />
                                <Divider orientation={'vertical'}/>
                                <InputLayout inputName={'Start date'} dark={props.dark} handleChange={setStartDate}
                                             inputType={2}
                                             disabled={props.disabled} size={21} initialValue={startDate}
                                             key={"start-date"} setChanged={setChanged} margin={false}
                                />
                                <Divider orientation={'vertical'}/>
                                <InputLayout inputName={'Method'} dark={props.dark} handleChange={setMethod}
                                             inputType={1} selectFields={[
                                    {value: 'GET', key: 'GET'},
                                    {value: 'POST', key: 'POST'},
                                    {value: 'PUT', key: 'PUT'},
                                    {value: 'DELETE', key: 'DELETE'},
                                    {value: 'Any', key: null}
                                ]}
                                             disabled={props.disabled} size={15} initialValue={method}
                                             key={"method-select"} setChanged={setChanged} margin={false}
                                />
                                <Divider orientation={'vertical'}/>
                                <InputLayout inputName={'This machine'} dark={props.dark} handleChange={setThisMachine}
                                             inputType={1} selectFields={[
                                    {value: 'Yes', key: true},
                                    {value: 'No', key: false}
                                ]}
                                             disabled={props.disabled} size={15} initialValue={thisMachine}
                                             key={"machine-select"} setChanged={setChanged} margin={false}
                                />
                                <Button disabled={!changed} onClick={() => fetchData()}>
                                    filter
                                </Button>
                            </div>
                        </div>

                        <div className={styles.activities_container}>
                            {data.length > 0 ? data.map(activity => (
                                <AccordionLayout
                                    content={
                                        <div className={styles.info_container}>
                                            <div className={styles.info_row}>
                                                <p style={{fontWeight: 450}}>Platform</p>
                                                <Divider orientation={'horizontal'} style={{width: '2vw',  marginLeft: '10px', marginRight: '10px'}}/>
                                                <p style={{fontSize: '.9rem', fontWeight: 420,color: props.dark ? 'white' : '#555555'}}>{activity.access_log.platform}</p>
                                            </div>
                                            <div className={styles.info_row}>
                                                <p style={{fontWeight: 450}}>Browser</p>
                                                <Divider orientation={'horizontal'} style={{width: '2vw',  marginLeft: '10px', marginRight: '10px'}}/>
                                                <p style={{fontSize: '.9rem', fontWeight: 420,color: props.dark ? 'white' : '#555555'}}>{activity.access_log.browser_version}</p>
                                            </div>

                                            <div className={styles.info_row}>
                                                <p style={{fontWeight: 450}}>Browser Engine</p>
                                                <Divider orientation={'horizontal'} style={{width: '2vw',  marginLeft: '10px', marginRight: '10px'}}/>
                                                <p style={{fontSize: '.9rem', fontWeight: 420,color: props.dark ? 'white' : '#555555'}}>{activity.access_log.browser_engine}</p>
                                            </div>
                                            <div className={styles.info_row}>
                                                <p style={{fontWeight: 450}}>User Agent</p>
                                                <Divider orientation={'horizontal'} style={{width: '2vw',  marginLeft: '10px', marginRight: '10px'}}/>
                                                <p style={{fontSize: '.9rem', fontWeight: 420,color: props.dark ? 'white' : '#555555'}}>{activity.access_log.browser_user_agent}</p>
                                            </div>
                                        </div>
                                    }
                                    summary={
                                        <div style={{display: 'flex'}}>
                                            <p style={{
                                                color: getMethodColor(activity.method) !== null ? getMethodColor(activity.method) : null
                                            }}>{activity.method}</p>
                                            <p style={{marginRight: '10px', marginLeft: '10px'}}>{activity.method.indexOf('?') > -1 ? activity.path.substr(0, activity.path.indexOf('?')) : activity.path}</p>
                                            <p>{(new Date(activity.time_of_creation)).toDateString()}</p>
                                        </div>
                                    }
                                    closedSize={22}
                                    openSize={45}
                                    border={getMethodColor(activity.method) !== null ? getMethodColor(activity.method) + ' 2px solid' : null}
                                />
                            )):
                                <div style={{
                                    width: '90%',
                                    margin: 'auto',
                                    borderRadius: '8px',
                                    border: !props.dark ? '#e2e2e2 1px solid' : null,
                                    backgroundColor: props.dark ? '#3b424c' : null
                                }}>
                                    <p style={{textAlign: 'center', fontWeight: 445}}>{lang.nothingFound}</p>
                                </div>
                            }

                        </div>
                    </>
                }
            </Layout>
        )
    else
        return <></>
}
