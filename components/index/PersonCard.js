import styles from '../../styles/index/Index.module.css'
import {Avatar, Button, Divider} from "@material-ui/core";
import React, {useState} from 'react'
import {CakeRounded, WarningRounded} from "@material-ui/icons";
import Link from 'next/link'
import PropTypes from 'prop-types'
import shared from "../../styles/shared/Shared.module.css";
import ImageHost from "../../utils/shared/ImageHost";
import {getBorder, getBoxShadow, getTertiaryBackground, getTertiaryColor} from "../../styles/shared/MainStyles";
import mainStyles from '../../styles/shared/Main.module.css'

export default function PersonCard(props) {

    const [hovered, setHovered] = useState(false)
    return (
        <div
            className={[styles.card_container, mainStyles.normalBorder].join(' ')}
            key={'user-' + props.profile.corporate_email}
            onMouseLeave={() => setHovered(false)}
            onMouseEnter={() => setHovered(true)}
            style={{
                ...getTertiaryBackground({dark: props.dark}),
                ...getBoxShadow({
                    dark: props.dark,
                    hovered: hovered
                }),
                ...getBorder({dark: props.dark, hovered: hovered})
            }}
        >
            <Link href={{pathname: '/person', query: {id: props.profile.id}}}>
                <Button style={{
                    height: '25vh',
                    width: '100%',
                    textTransform: 'none',
                    borderTopRightRadius: '8px',
                    borderTopLeftRadius: '8px',
                }}>
                    <div className={styles.persona_fields_container}>
                        <div className={shared.card_title}>
                            <Avatar src={props.profile.image !== undefined ? ImageHost() + props.profile.image : null}
                                    style={{...{height: '80px', width: '80px'}, ...getBoxShadow({dark: props.dark})}}/>
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
                        <Divider orientation={'horizontal'} style={{width: '100%'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 400,
                            color: (props.dark ? '#e2e2e2' : '#444444')
                        }}>{props.profile.corporate_email}</p>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 400,
                            color: (props.dark ? '#e2e2e2' : '#444444')
                        }}>{props.profile.extension}</p> {/*last 4 digits*/}
                    </div>

                </Button>
            </Link>
            <Divider orientation={'horizontal'} style={{width: '100%'}}/>
            {props.unit !== undefined && props.unit !== null ?
                <Link href={{pathname: '/unit', query: {id: props.unit.id}}}>
                    <Button style={{
                        ...{
                            borderBottomRightRadius: '8px',
                            borderBottomLeftRadius: '8px', width: '100%',
                        },
                        ...getTertiaryColor({dark: props.dark})
                    }}
                    >
                        {props.unit.acronym}
                    </Button>
                </Link>
                :
                <div className={styles.inactive_container}>
                    <WarningRounded style={{color: (!props.dark ? '#555555' : '#ededed')}}/>
                    <p>{props.inactiveLocale}</p>
                </div>
            }

        </div>

    )
}

PersonCard.proptypes = {
    dark: PropTypes.bool,
    profile: PropTypes.object,
    collaboration: PropTypes.object,
    id: PropTypes.string,
    inactiveLocale: PropTypes.string
}