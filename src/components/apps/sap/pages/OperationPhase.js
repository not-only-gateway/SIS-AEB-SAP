import React, {useEffect, useState} from 'react'
import Head from "next/head";
import ProjectRequests from "../utils/requests/ProjectRequests";

import PropTypes from 'prop-types'

export default function OperationPhase(props) {
    const [project, setProject] = useState(undefined)
    const [currentStructure, setCurrentStructure] = useState({
        ted: null
    })
    useEffect(() => {
        ProjectRequests.fetchProject(props.id).then(res => {
            if (res !== null)
                setProject(res)
        })
    }, [])

    return (
        <>
            <Head>
                <title>{project.name}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

        </>
    )
}
OperationPhase.propTypes = {
    routerQuery: PropTypes.object,
    redirect: PropTypes.func
}