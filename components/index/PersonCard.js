import styles from '../../styles/index/Index.module.css'
import {Avatar, Button} from "@material-ui/core";
import React, {useEffect, useState} from 'react'
import {CakeRounded, WarningRounded} from "@material-ui/icons";
import Link from 'next/link'
import PropTypes from 'prop-types'
import shared from "../../styles/shared/Shared.module.css";
import ImageHost from "../../utils/shared/ImageHost";

export default function PersonCard(props) {

    const [hovered, setHovered] = useState(false)
    return (
        <div
            className={styles.card_container}
            key={'user-' + props.profile.corporate_email}
            onMouseLeave={() => setHovered(false)}
            onMouseEnter={() => setHovered(true)}
            style={{
                backgroundColor: props.dark ? '#3b424c' : null,
                boxShadow:  props.dark ? 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px': !hovered ? "none" : (!props.dark ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'initial'),
                border: !props.dark ? '#e2e2e2 1px solid' : null,
                borderRadius: '8px'
            }}
        >
            <Link href={{pathname: '/person', query: {id: props.profile.id}}} >
                <Button style={{
                    height: '25vh',
                    width: '100%',
                    textTransform: 'none',
                    borderTopRightRadius: '8px',
                    borderTopLeftRadius: '8px',
                }}>
                    <div className={styles.persona_fields_container}>
                        <div className={shared.card_title} style={{borderBottom: !props.dark ? '#e2e2e2 1px solid' : '#777777 1px solid'}}>
                            <Avatar src={props.profile.image !== undefined ? ImageHost()+props.profile.image : null} alt={props.profile.name}
                                    style={{height: '70px', width: '70px'}}/>
                            <p style={{
                                fontSize: '1rem',
                                fontWeight: 445,
                                color: (props.dark ? 'white' : 'black')
                            }}>{props.profile.name}</p>
                            {((new Date(props.profile.birth)).getDay() !== (new Date).getDay() && (new Date(props.profile.birth)).getMonth() === (new Date).getMonth()) ?
                                <CakeRounded style={{color: '#f54269', fontSize: '1.8rem'}}/>
                                :
                                null
                            }
                        </div>
                        <p style={ {
                            fontSize: '.9rem',
                            fontWeight: 400,
                            color: (props.dark ? '#e2e2e2' : '#444444')
                        }}>{props.profile.corporate_email}</p>
                        <p style={ {
                            fontSize: '.9rem',
                            fontWeight: 400,
                            color: (props.dark ? '#e2e2e2' : '#444444')
                        }}>{props.profile.extension}</p> {/*last 4 digits*/}
                    </div>
                </Button>
            </Link>
            {props.unit !== undefined && props.unit !== null?
                <Link href={{pathname: '/unit', query: {id: props.unit.id}}}>
                    <Button style={{
                        borderTop: !props.dark ? '#e2e2e2 1px solid' : '#777777 1px solid',
                        borderBottomRightRadius: '8px',
                        borderBottomLeftRadius: '8px', width: '100%',
                        fontWeight: 500,
                    }}
                    >
                        {props.unit.acronym}
                    </Button>
                </Link>
                :
                <div className={styles.inactive_container}>
                    <WarningRounded style={{color:(!props.dark ? '#555555' : '#ededed')}}/>
                    <p>{props.inactiveLocale}</p>
                </div>
            }

        </div>

    )
}

PersonCard.proptypes={
    dark: PropTypes.bool,
    profile: PropTypes.object,
    collaboration: PropTypes.object,
    id: PropTypes.string,
    inactiveLocale: PropTypes.string
}