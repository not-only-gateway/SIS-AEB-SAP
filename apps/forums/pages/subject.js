import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import ForumRequests from "../utils/fetch/ForumRequests";
import Pops from "../components/subjects/Pops";
import handleObjectChange from "../utils/shared/HandleObjectChange";

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


    return (
        <>
            <Head>
                <title>Canvas</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>


            <Pops subjectID={id} data={subject} handleChange={event => handleObjectChange({
                event: event,
                setData: setSubject
            })}/>

        </>
    )
}
