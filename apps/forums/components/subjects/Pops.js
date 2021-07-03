import PropTypes from 'prop-types'
import {useEffect, useState} from "react";
import Head from "next/head";
import {AddRounded, EditRounded, Forum, PeopleRounded, VisibilityRounded} from "@material-ui/icons";
import ForumRequests from "../../utils/fetch/ForumRequests";
import styles from '../../styles/Subject.module.css'
import UnitPT from "../../packages/locales/unit/UnitPT";
import Chart from "../shared/components/Chart";
import PopOverview from "./PopOverview";

export default function Pops(props) {
    const [pops, setPops] = useState([])
    const lang = UnitPT
    const [currentEntity, setCurrentEntity] = useState(null)

    useEffect(() => {
        ForumRequests.fetchTopPops(props.subjectID).then(res => setPops(res))
    }, [])

    return (
        <>
            <Head>
                <title>
                    {lang.title}
                </title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <Chart
                fetchDependents={async function (entity) {
                    if (entity !== undefined && entity !== null && entity.id !== undefined) {
                        return await ForumRequests.fetchDependentPops(entity.id)
                    } else
                        return []
                }}
                handleClick={entity => {
                    setCurrentEntity(entity)
                }} openElement={currentEntity}
                getEntityKey={entity => {
                    if (entity !== undefined && entity !== null)
                        return entity.id
                    else
                        return undefined
                }}
                renderEndNode={() => (
                <div style={{
                    border: 'white 8px solid',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '40px',
                    width: '40px',
                    alignItems: 'center'

                }}>
                    <AddRounded/>
                </div>
            )} endNodeContent={{create: true}} endNode={true}
                renderEntity={entity => {
                    if (entity !== undefined && entity !== null) {
                        if (entity === currentEntity)
                            return (
                                <PopOverview data={currentEntity} handleClose={() => setCurrentEntity(null)}/>
                            )
                        else
                            return (
                                <div style={{
                                    border: 'white 8px solid',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    maxWidth: '200px',
                                    height: '73px',
                                    minHeight: '75px',
                                    minWidth: '110px',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        margin: 'auto', overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {entity.title}
                                    </div>
                                </div>
                            )
                    } else
                        return null
                }}
                firstEntities={pops}
            />
        </>
    )
}
Pops.propTypes = {
    subjectID: PropTypes.number
}