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
import ActivityComponent from "../components/activity/Activity";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";

export default function Activity() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [changed, setChanged] = useState(false)
    const [method, setMethod] = useState(null)
    const [thisMachine, setThisMachine] = useState(false)
    const [path, setPath] = useState(null)
    const [maxID, setMaxID] = useState(null)
    const [lastFetchSize, setLastFetchSize] = useState(null)

    async function fetchData() {
        console.log('FETCHING')

        await axios({
            method: 'get',
            url: Host() + 'activity',
            headers: {'authorization': (new Cookies()).get('jwt')},
            params: {
                start_date: startDate !== null ? startDate.getTime() : null,
                ip: thisMachine ? localIpUrl('public') : null,
                method: method,
                path: path,
                max_id: maxID
            }
        }).then(res => {
            console.log(res.data)
            if(!changed){
                if(data.length > 0){
                    const newData = [...data, ...res.data]
                    setData(newData)
                }

                else
                    setData(res.data)

                if(res.data.length > 0)
                    setMaxID(res.data[res.data.length-1].id)
                setLastFetchSize(res.data.length)
            }
            else{
                setChanged(false)
                setData(res.data)
            }

            console.log(maxID)

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
                                <InputLayout inputName={lang.search} dark={props.dark} handleChange={setPath}
                                             inputType={0}
                                             disabled={props.disabled} size={21} initialValue={path}
                                             key={"path"} setChanged={setChanged} margin={false}
                                />
                                <Divider orientation={'vertical'}/>
                                <InputLayout inputName={lang.startDate} dark={props.dark} handleChange={setStartDate}
                                             inputType={2}
                                             disabled={props.disabled} size={21} initialValue={startDate}
                                             key={"start-date"} setChanged={setChanged} margin={false}
                                />
                                <Divider orientation={'vertical'}/>
                                <InputLayout inputName={lang.method} dark={props.dark} handleChange={setMethod}
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
                                <InputLayout inputName={lang.machine} dark={props.dark} handleChange={setThisMachine}
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

                        <div className={styles.infinite_scroll_container}>
                            {data.length > 0 ?
                                <InfiniteScroll
                                    dataLength={data.length} //This is important field to render the next data
                                    next={() => fetchData()}
                                    hasMore={lastFetchSize === 20 && data[data.length-1].id > 0}
                                    inverse={false}
                                    scrollableTarget="scrollableDiv"
                                    loader={<Skeleton variant={'rect'} width={'100%'} style={{borderRadius: '8px'}} height={'7vh'}/>}
                                    endMessage={
                                        <div style={{
                                            width: '90%',
                                            margin: 'auto',
                                            borderRadius: '8px',
                                            border: !props.dark ? '#e2e2e2 1px solid' : null,
                                            backgroundColor: props.dark ? '#3b424c' : null
                                        }}>
                                            <p style={{textAlign: 'center', fontWeight: 445}}>{lang.end}</p>
                                        </div>
                                    }
                                >
                                    <div className={styles.activities_container}>
                                    {data.map(activity => (
                                        <ActivityComponent lang={lang} dark={props.dark} activity={activity}
                                                           getColor={getMethodColor}/>
                                    ))}
                                    </div>
                                </InfiniteScroll>
                                :
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
