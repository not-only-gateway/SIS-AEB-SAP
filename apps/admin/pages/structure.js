import {useEffect, useState} from "react";
import StructuralRequests from "../utils/fetch/StructuralRequests";
import {useRouter} from "next/router";
import StructurePT from "../packages/locales/structure/StructurePT";
import Head from "next/head";
import {EditRounded, PeopleRounded} from "@material-ui/icons";
import styles from '../styles/Structure.module.css'
import CollaborationRequests from "../utils/fetch/CollaborationRequests";
import {Avatar} from "@material-ui/core";
import {Chart} from "sis-aeb-chart";

export default function structure() {

    const [unit, setUnit] = useState({})
    const router = useRouter()
    const lang = StructurePT
    const [accessProfile, setAccessProfile] = useState(null)


    useEffect(() => {
        StructuralRequests.fetchTopUnits().then(res => setUnit(res[0]))
        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null) {
            const accessProfileSession = JSON.parse(sessionStorage.getItem('accessProfile'))
            if (accessProfileSession.can_manage_structure) {
                setAccessProfile(accessProfileSession)
            } else
                router.push('/', '/', {locale: router.locale})

        }
    }, [])

    return (
        <>
            <Head>
                <title>
                    {lang.title}
                </title>
            </Head>
            <Chart
                firstEntity={unit} rowLimit={1}
                fetchDependents={async function (unit) {
                    if (unit !== undefined && unit !== null && unit.id !== undefined) {
                        return await StructuralRequests.fetchDependentUnits(unit.id)
                    } else
                        return []
                }}
                fetchExtendedDependents={async function (unit) {
                    if (unit.id !== undefined) {
                        return await CollaborationRequests.fetchDependentCollaborators(unit.id)
                    } else
                        return []
                }}
                renderEntity={unit => {
                    if (unit !== undefined && unit !== null)
                        return (
                            <div className={styles.unitContainer}>
                                <div className={[styles.unitNameContainer, styles.overflowEllipsis].join(' ')}>
                                    {unit.name}
                                </div>
                                <div className={styles.unitAcronymContainer} style={{textOverflow: 'ellipsis'}}>
                                    {unit.acronym}
                                </div>
                            </div>
                        )
                    else
                        return null
                }}
                renderExtendedEntity={entity => {
                    if (entity !== undefined && entity !== null)
                        return (
                            <div
                                className={styles.vacancyContainer}>
                                <Avatar src={entity.image}/>
                                <div style={{fontSize: '.9rem', maxWidth: '95%', color: '#111111'}} className={styles.overflowEllipsis}>
                                    {entity.name}
                                </div>
                                <div style={{fontSize: '.75rem', maxWidth: '95%', color: '#555555'}} className={styles.overflowEllipsis}>
                                    {entity.corporate_email}
                                </div>
                            </div>
                        )
                    else
                        return null
                }}
                baseWidth={150}
                extendedEntityWidth={200}
                hoverButtons={[
                    {
                        icon: <EditRounded style={{fontSize: '1.3rem', color: '#333333'}}/>,
                        label: lang.edit,
                        key: 0
                    },
                    {
                        icon: <PeopleRounded style={{fontSize: '1.3rem', color: '#333333'}}/>,
                        label: lang.vacancies,
                        key: 1,
                        extendButton: true
                    },
                ]} extendable={true}
                getExtendedEntityKey={entity => {
                    return 1
                }}
                getEntityKey={unit => {
                    if (unit !== undefined && unit !== null)
                        return unit.id
                    else
                        return undefined
                }}
                handleButtonClick={(unit, buttonKey) => router.push('/unit/?id=' + unit.id, undefined, {shallow: true})}/>
        </>
    )
}