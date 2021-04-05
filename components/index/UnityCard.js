import styles from '../../styles/index/Index.module.css'
import {Avatar, Button, Modal} from "@material-ui/core";
import React, {useState} from 'react'
import {CakeRounded, WarningRounded} from "@material-ui/icons";
import Cookies from "universal-cookie/lib";
import ModalProfileCard from "./ModalProfileCard";
import Link from 'next/link'
import PropTypes from 'prop-types'
import SimpleProfileCard from "../shared/SimpleProfileCard";
import shared from '../../styles/Shared.module.css'
export default function UnityCard(props) {

    const [hovered, setHovered] = useState(false)

    function renderContent() {
        const borderBottom = {borderBottom: !props.dark ? '#e2e2e2 1px solid' : '#777777 1px solid'}
        const secondaryField = {
            fontSize: '.9rem',
            fontWeight: 400,
            color: (props.dark ? '#e2e2e2' : '#444444')
        }
        return (
            <div className={styles.persona_fields_container}>
                <div className={styles.card_title} style={borderBottom}>
                    <p style={{
                        fontSize: '1.2rem',
                        fontWeight: 450,
                        color: (props.dark ? 'white' : 'black')
                    }}>{props.unity.acronym}</p>
                    <p style={secondaryField}>{props.unity.name}</p>
                </div>
                <fieldset style={{borderRadius: '8px', width: '100%', lineHeight: '1px'}}>
                    <legend>
                        <p>Information</p>
                    </legend>
                    <div className={shared.row}>
                        <p>Colaboradores</p>
                        <p style={secondaryField}>{props.collaborators}</p>
                    </div>
                    <div className={shared.row}>
                        <p>Mission: </p>
                        <p style={secondaryField}>{props.unity.mission}</p>
                    </div>
                    {props.collaborators > 0 ?
                        <div className={shared.row}>
                            <p>Collab: {props.unity.highest_collaborator}</p>
                            <SimpleProfileCard dark={props.dark} pic={props.unity.highest_collaborator.pic} name={props.unity.highest_collaborator.name}/>
                        </div>
                        :
                        null
                    }

                </fieldset>
            </div>
        )
    }

    return (
        <div
            className={styles.card_container} key={'unity - ' + props.unity.id}
            onMouseLeave={() => setHovered(false)}
            onMouseEnter={() => setHovered(true)}
            style={{
                backgroundColor: props.dark ? '#3b424c' : null,
                boxShadow: !hovered ? null : (!props.dark ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'initial'),
                border: !props.dark ? '#e2e2e2 1px solid' : null,
                borderRadius: '8px'
            }}
        >
            {props.canEdit ?
                <Link href={{pathname: '/unity', query: {id: props.unity.id}}}>
                    <Button style={{
                        height: props.unity.parent_community !== undefined ? '25vh' : '29vh',
                        width: '100%',
                        textTransform: 'none',
                        borderTopRightRadius: '8px',
                        borderTopLeftRadius: '8px',
                    }}>
                        {renderContent()}
                    </Button>
                </Link>
                :
                <div style={{
                    height: props.unity.parent_community !== undefined ? '25vh' : '29vh',
                    width: '100%',
                    textTransform: 'none',
                    borderTopRightRadius: '8px',
                    borderTopLeftRadius: '8px',
                }}>
                    {renderContent()}
                </div>
            }
            {props.unity.parent_community !== undefined ?

                <Button style={{
                    borderTop: !props.dark ? '#e2e2e2 1px solid' : '#777777 1px solid',
                    borderBottomRightRadius: '8px',
                    borderBottomLeftRadius: '8px', width: '100%'
                }} disabled={!props.canEdit}
                >
                    {props.unity.parent_community.acronym} - {props.unity.parent_community.name}
                </Button>
                :
                null

            }

        </div>

    )
}
UnityCard.proptypes = {
    dark: PropTypes.bool,
    unity: PropTypes.object,
    highestCollaborator: PropTypes.object,
    collaborators: PropTypes.number,
    canEdit: PropTypes.bool
}