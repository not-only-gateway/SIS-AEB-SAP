import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import styles from '../styles/subject/Subject.module.css'
import UnitPT from "../packages/locales/SubjectPT";
import Head from "next/head";
import {RenderTabs, Tabs} from "sis-aeb-misc";
import ForumRequests from "../utils/fetch/ForumRequests";
import {AvatarGroup} from "@material-ui/lab";
import PersonAvatar from "../components/shared/PersonAvatar";
import Pops from "../components/subjects/Pops";

export default function subject(props) {
    const router = useRouter()
    const [id, setId] = useState(undefined)
    const [subject, setSubject] = useState(null)

    useEffect(() => {
        if (id === undefined && router.query.id !== undefined) {
            setId(router.query.id)
            ForumRequests.fetchSubject(router.query.id).then(res => setSubject(res))
        }

    }, [router.query])

    if (id !== undefined && subject !== undefined && subject !== null)
        return (
            <>
                <Head>
                    <title>{subject.title}</title>
                    <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
                </Head>


                <div className={styles.content}>
                    <Pops subjectID={id} data={subject}/>
                </div>
            </>


        )
    else
        return <>{JSON.stringify(subject)}</>
}
