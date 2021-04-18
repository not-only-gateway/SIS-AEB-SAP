import styles from '../../styles/index/Index.module.css'
import {Button, Divider} from "@material-ui/core";
import React, {useState} from 'react'
import {WarningRounded} from "@material-ui/icons";
import Link from 'next/link'
import PropTypes from 'prop-types'
import {
    getBorder,
    getBoxShadow,
    getIconStyle, getPrimaryBackground, getPrimaryColor,
    getTertiaryBackground,
    getTertiaryColor
} from "../../styles/shared/MainStyles";
import mainStyles from '../../styles/shared/Main.module.css'
import AvatarLayout from "../shared/AvatarLayout";

const currentDate = new Date()

export default function PersonCard(props) {

    const [hovered, setHovered] = useState(false)

    return (
        <div
            className={[styles.cardContainer, mainStyles.displayColumnSpaced].join(' ')}
            key={props.profile.id}
            style={{
                ...getPrimaryBackground({dark: props.dark}),
                // ...hovered ? getBorder({dark: props.dark}) : null,
                ...{borderRadius: '8px'}
            }}>

            <Link href={{pathname: '/person', query: {id: props.profile.id}}}>
                <Button
                    style={{
                        height: '100%',
                        textTransform: 'none',
                        width: '100%',
                        margin: 'auto',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}
                    onMouseLeave={() => setHovered(false)}
                    onMouseEnter={() => setHovered(true)}>
                    <div>
                        <AvatarLayout dark={props.dark}
                                      cakeDay={((new Date(props.profile.birth)).getDay() === currentDate.getDay() && (new Date(props.profile.birth)).getMonth() === currentDate.getMonth())}
                                      image={props.profile.image}
                                      key={props.profile.id}/>


                        <div style={{transform: 'translateY(2%) translateX(2%)',}}>
                            <p className={mainStyles.primaryParagraph}
                               style={{...getPrimaryColor({dark: props.dark}), ...{textAlign: 'left'}}}>{props.profile.name}</p>
                            <p className={mainStyles.tertiaryParagraph}
                               style={{...getTertiaryColor({dark: props.dark}), ...{textAlign: 'left'}}}>{props.profile.corporate_email}</p>
                            <p className={mainStyles.tertiaryParagraph}
                               style={{...getTertiaryColor({dark: props.dark}), ...{textAlign: 'left'}}}>{props.profile.extension}</p>
                        </div>
                    </div>
                </Button>
            </Link>
            {props.unit !== undefined && props.unit !== null ?
                <Link href={{pathname: '/unit', query: {id: props.unit.id}}}>
                    <Button style={{
                        ...getPrimaryBackground({dark: props.dark}),
                        ...getTertiaryColor({dark: props.dark}),
                        ...{
                            borderRadius: '8px',
                            width: '90%',
                            margin: '10px auto 10px',
                            backgroundColor: 'black',
                            color: 'white'
                        }
                    }} className={mainStyles.secondaryParagraph}
                    >

                        {props.unit.acronym}
                    </Button>
                </Link>
                :
                <div style={{
                    ...getPrimaryBackground({dark: props.dark}),
                    ...getTertiaryColor({dark: props.dark}),
                    ...{
                        borderRadius: '8px',
                        width: '90%',
                        margin: '10px auto 10px',
                        backgroundColor: 'rgba(236, 78, 43, 0.2)',
                        color: 'white',
                        height: 'fit-content'
                    }
                }} className={[mainStyles.secondaryParagraph, mainStyles.displayInlineSpaced].join(' ')}>
                    <WarningRounded style={{
                        transform: 'translateX(10px)',
                        fontSize: '1.6rem',
                        color: props.highlight ? props.dark ? 'black' : '' : !props.dark ? '#777777' : '#ededed'
                    }}/>
                    <p className={mainStyles.tertiaryParagraph}
                       style={{...{transform: 'translateX(-10px)'}, ...getTertiaryColor({dark: props.dark})}}>{props.inactiveLocale}</p>
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