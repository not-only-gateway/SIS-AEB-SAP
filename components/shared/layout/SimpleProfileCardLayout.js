import React, {useState} from 'react'
import styles from '../../../styles/SimpleProfile.module.css'
import {Avatar} from "@material-ui/core";
import PropTypes from 'prop-types'
import ImageHost from "../../../utils/shared/ImageHost";
import mainStyles from '../../../styles/shared/Main.module.css'
import {
    getBorder,
    getBoxShadow,
    getSecondaryBackground,
    getSecondaryColor,
    getTertiaryColor
} from "../../../styles/shared/MainStyles";

export default function SimpleProfileCardLayout(props) {
    const [hovered, setHovered] = useState(false)
    return (
        <div onMouseLeave={() => setHovered(false)} onMouseEnter={() => setHovered(true)}
             className={[styles.simplifiedProfileContainer, mainStyles.smallPaddingHorizontal, mainStyles.normalBorder, mainStyles.displayInlineSpaced, mainStyles.smallPaddingVertical].join(' ')}
             style={{
                 ...getSecondaryBackground({dark: props.dark}),
                 ...getBoxShadow({dark: props.dark, hovered: hovered}),
                 ...getBorder({dark: props.dark, hovered: hovered})
             }}>

            <div style={{width: '75%', marginLeft: '10px'}}>

            </div>
        </div>
    )
}

SimpleProfileCardLayout.propTypes = {
    dark: PropTypes.bool,
    image: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    reduced: PropTypes.bool
}