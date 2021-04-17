import styles from '../../styles/index/Index.module.css'
import {Button, Divider} from "@material-ui/core";
import React, {useState} from 'react'
import {WarningRounded} from "@material-ui/icons";
import Link from 'next/link'
import PropTypes from 'prop-types'
import {
    getBorder,
    getBoxShadow,
    getIconStyle, getPrimaryBackground,
    getTertiaryBackground,
    getTertiaryColor
} from "../../styles/shared/MainStyles";
import mainStyles from '../../styles/shared/Main.module.css'
import AvatarLayout from "./AvatarLayout";

const currentDate = new Date()

export default function PersonCard(props) {

    const [hovered, setHovered] = useState(false)

    return (
        <div
            className={[styles.cardContainer, mainStyles.normalBorder].join(' ')}
            key={props.profile.id}
            onMouseLeave={() => setHovered(false)}
            onMouseEnter={() => setHovered(true)}
            style={{
                ...getPrimaryBackground({dark: props.dark}),
                ...getBoxShadow({
                    dark: props.dark,
                    hovered: hovered
                }),
                ...getBorder({dark: props.dark, hovered: hovered})
            }}
        >
            <Link href={{pathname: '/person', query: {id: props.profile.id}}}>
                <Button style={{
                    height: '11vh',
                    width: '22.05vw',
                    textTransform: 'none',
                    borderTopRightRadius: '8px',
                    borderTopLeftRadius: '8px',
                }}>
                    <div className={mainStyles.displayInlineSpaced}
                         style={{width: '18vw', margin: 'auto', lineHeight: '10px'}}>
                        <AvatarLayout dark={props.dark}
                                      cakeDay={((new Date(props.profile.birth)).getDay() === currentDate.getDay() && (new Date(props.profile.birth)).getMonth() === currentDate.getMonth())}
                                      image={props.profile.image}
                                      key={props.profile.id}/>
                        <div style={{overflow: 'hidden'}}>
                            <p className={mainStyles.primaryParagraph} style={{
                                textAlign: 'right',
                                color: '#39adf6',
                                fontWeight: 500,
                                textTransform: 'capitalize'
                            }}>{props.profile.name}</p>
                            <p className={mainStyles.secondaryParagraph}
                               style={{...getTertiaryColor({dark: props.dark}), ...{textAlign: 'right'}}}>{props.profile.corporate_email}</p>
                            <p className={mainStyles.secondaryParagraph}
                               style={{...getTertiaryColor({dark: props.dark}), ...{textAlign: 'right'}}}>{props.profile.extension}</p>
                        </div>
                    </div>

                </Button>
            </Link>
            <Divider orientation={'horizontal'} style={{width: '100%'}}/>
            {props.unit !== undefined && props.unit !== null ?
                <Link href={{pathname: '/unit', query: {id: props.unit.id}}}>
                    <Button style={{
                        ...{
                            height: '4vh',
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
                <div className={mainStyles.displayInlineCenter}
                     style={{backgroundColor: "rgba(236, 78, 43, 0.2)", width: '100%'}}>
                    <WarningRounded style={getIconStyle({dark: props.dark})}/>
                    <p className={mainStyles.tertiaryParagraph}
                       style={getTertiaryColor({dark: props.dark})}>{props.inactiveLocale}</p>
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
    inactiveLocale: PropTypes.string,
    lastActivity: PropTypes.number
}