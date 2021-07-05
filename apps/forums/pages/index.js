import React, {useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import AuthenticatePT from "../packages/locales/authenticate/AuthenticatePT";
import IndexPT from "../packages/locales/IndexPT";
import {Header} from 'sis-aeb-misc'
import SubjectList from "../components/subjects/SubjectList";

export default function index(props) {
    const lang = IndexPT
    const router = useRouter()
    const [openForm, setOpenForm] = useState(false)
    return (
        <>
            <Head>
                <title>{lang.title}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <div style={{width: '65%', margin: 'auto', overflowY: 'hidden', marginTop: '32px'}}>
                {openForm ? null :
                    <Header title={lang.title}/>
                }
                <SubjectList
                    notSearched={props.notSearched} setNotSearched={props.setNotSearched}
                    searchInput={props.searchInput} setOpen={setOpenForm}
                    redirect={id => router.push('/subject/?id=' + id, undefined, {shallow: true})}
                />
            </div>
        </>
    )
}
