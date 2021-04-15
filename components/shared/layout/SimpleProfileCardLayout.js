import React, {useState} from 'react'
import styles from '../../../styles/person/Person.module.css'
import {Avatar} from "@material-ui/core";
import PropTypes from 'prop-types'
import ImageHost from "../../../utils/shared/ImageHost";
import mainStyles from '../../../styles/shared/Main.module.css'
import {getBorder, getSecondaryBackground} from "../../../styles/shared/MainStyles";

export default function SimpleProfileCardLayout(props) {
    const [hovered, setHovered] = useState(false)
    return (
        <div onMouseLeave={() => setHovered(false)} onMouseEnter={() => setHovered(true)} className={styles.simplified_profile_container}
             style={{
                 ...getSecondaryBackground({dark: props.dark}),
             ...{boxShadow:  props.dark ? 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px': !hovered ? "none" : (!props.dark ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'none'),},
                 ...getBorder({dark: props.dark})
             }}>
            <Avatar src={ImageHost() + props.image} style={{width: '50px', height: '50px'}}/>
            <div style={{
                color: props.dark ? 'white' : 'black',
                fontSize: '.9rem',
                maxWidth: '72%',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
            }}>{props.name}</div>
        </div>
    )
}

SimpleProfileCardLayout.propTypes = {
    dark: PropTypes.bool,
    image: PropTypes.string,
    name: PropTypes.string
}