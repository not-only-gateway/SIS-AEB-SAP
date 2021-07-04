import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import styles from '../styles/Subject.module.css'
import UnitPT from "../packages/locales/unit/UnitPT";
import Head from "next/head";
import {RenderTabs, Tabs} from "sis-aeb-misc";
import ForumRequests from "../utils/fetch/ForumRequests";
import {AvatarGroup} from "@material-ui/lab";
import PersonAvatar from "../components/shared/PersonAvatar";
import Pops from "../components/subjects/Pops";

export default function subject(props) {
    const router = useRouter()
    const [id, setId] = useState(undefined)
    const [subject, setSubject] = useState({})

    useEffect(() => {
        if (id === undefined && router.query.id !== undefined) {
            setId(router.query.id)
            ForumRequests.fetchSubject(router.query.id).then(res => setSubject(res))
        }

    }, [router.query])

    if (id !== undefined)
        return (
            <>
                <Head>
                    <title>{subject.title}</title>
                    <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
                </Head>

                <div className={styles.pageContainer}>
                    <div className={styles.header}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',

                        }}>
                            <div className={styles.infoHeader}>
                                <div style={{
                                    fontSize: '1.6rem',
                                    color: '#333333',
                                    textTransform: 'capitalize'
                                }}>
                                    {subject.title}
                                </div>
                                <div style={{
                                    fontSize: '.9rem',
                                    color: '#555555',
                                    textTransform: 'capitalize'
                                }}>
                                    {subject.description}
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <AvatarGroup>
                                    {subject.collaborators !== undefined ? subject.collaborators.map(collaborator =>
                                        <PersonAvatar image={collaborator.image} variant={'circular'}
                                                      elevation={'false'}>
                                            {collaborator.name}
                                        </PersonAvatar>
                                    ) : null}
                                </AvatarGroup>
                            </div>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <Pops subjectID={id}/>
                    </div>
                </div>
            </>


        )
    else
        return <></>
}
