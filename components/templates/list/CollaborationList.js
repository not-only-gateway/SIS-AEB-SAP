import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";

import Accordion from "../../layout/Accordion";
import fetchComponentData from "../../../utils/person/FetchData";
import {Divider} from "@material-ui/core";
import CollaborationSummary from "../../elements/CollaborationSummary";
import mainStyles from '../../../styles/shared/Main.module.css'
import {getIconStyle} from "../../../styles/shared/MainStyles";
import CollaborationForm from "../forms/CollaborationForm";
import fetchAllCollaborations from "../../../utils/fetch/FetchAllCollaborations";
import Collaboration from "../../modules/entity/Collaboration";

export default function CollaborationList(props) {
    const [collaborations, setCollaborations] = useState([])


    useEffect(() => {
        fetchAllCollaborations(props.id).then(res => {
            setCollaborations(res)
        })
    }, [])

    return (
        <div style={{
            width: '100%',
            display: 'grid',
            justifyItems: 'center',
            gap: '16px'
        }}>
            <Collaboration memberID={props.id} create={true} key={'create'} index={undefined}
                           collaborationID={undefined} locale={props.locale} canEdit={props.editionMode}
                           fetch={() => fetchAllCollaborations(props.id).then(res => {
                               setCollaborations(res)
                           })}/>

            {collaborations.map((collaboration, index) => (
                <div key={collaboration.id + '-collaboration-' + index} style={{width: '100%'}}>
                    <Collaboration memberID={props.id} collaborationID={collaboration.id} key={collaboration.id}
                                   create={false} index={index} locale={props.locale} canEdit={props.editionMode}
                                   fetch={() => fetchAllCollaborations(props.id).then(res => {
                                       setCollaborations(res)
                                   })}/>
                </div>
            ))
            }
        </div>
    )

}

CollaborationList.propTypes = {
    dark: PropTypes.bool,
    editionMode: PropTypes.bool,
    id: PropTypes.string,
    locale: PropTypes.string
}
