import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";

import Accordion from "../layout/Accordion";
import fetchComponentData from "../../utils/person/FetchData";
import {Divider} from "@material-ui/core";
import CollaborationSummary from "../elements/CollaborationSummary";
import mainStyles from '../../styles/shared/Main.module.css'
import {getIconStyle} from "../../styles/shared/MainStyles";
import CollaborationForm from "../templates/forms/CollaborationForm";
import Collaboration from "./Collaboration";
import fetchAllCollaborations from "../../utils/fetch/FetchAllCollaborations";

export default function CollaborationList(props) {
    const [collaborations, setCollaborations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAllCollaborations(props.id).then(res => {
            setCollaborations(res)
            setLoading(false)
        })
    }, [])

    if (!loading)
        return (
            <div style={{
                width: '100%',
                display: 'grid',
                justifyItems: 'center',
                gap: '16px'
            }}>
                {!props.editionMode ?
                    null :
                    <Collaboration memberID={props.id} create={true} key={'create'} index={undefined} collaborationID={undefined} locale={props.locale} canEdit={props.editionMode}/>
                }
                {collaborations.map((collaboration, index) => (
                    <Collaboration memberID={props.id} collaborationID={collaboration.id} key={collaboration.id} create={false} index={index} locale={props.locale} canEdit={props.editionMode}/>


                ))
                }
            </div>
        )
    else
        return null
}

CollaborationList.propTypes = {
    dark: PropTypes.bool,
    editionMode: PropTypes.bool,
    id: PropTypes.string,
    locale: PropTypes.string
}
