import {useEffect, useState} from "react";
import StructuralRequests from "../utils/fetch/StructuralRequests";
import {useRouter} from "next/router";
import StructurePT from "../packages/locales/structure/StructurePT";
import Canvas from "../components/shared/test/Canvas";
import Head from "next/head";
import {EditRounded} from "@material-ui/icons";
import styles from '../styles/Structure.module.css'
export default function structure() {

    const [unit, setUnit] = useState({})
    const router = useRouter()
    const lang = StructurePT
    useEffect(() => {
        StructuralRequests.fetchTopUnits().then(res => setUnit(res[0]))
    }, [])

    return (
        <>
            <Head>
                <title>
                    {lang.title}
                </title>
            </Head>
            <Canvas
                firstEntity={unit} rowLimit={2}
                fetchDependents={async function (unit) {
                    if(unit.id !== undefined) {
                        return await StructuralRequests.fetchDependentUnits(unit.id)
                    }
                    else
                        return []
                }}
                fetchExtendedDependents={() => null}
                renderEntity={unit => {
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
                }}
                renderExtendedEntity={entity => {
                    return (
                        <div>
                            {entity.id}
                        </div>
                    )
                }}
                hoverButtons={[
                    {
                        icon: <EditRounded style={{fontSize: '1.3rem', color: '#333333'}}/>,
                        label: lang.edit,
                        key: 0
                    }
                ]} extendable={true}
                getExtendedEntityKey={entity => {
                    return 1
                }}
                getEntityKey={unit => {
                    return unit.id
                }}
                handleButtonClick={(unit, buttonKey) => router.push('/unit/?id=' + unit.id, undefined, {shallow: true})}/>
        </>
    )
}