import React, {useEffect} from 'react'
import styles from '../../../styles/Profile.module.css'
import {Avatar} from "@material-ui/core";
import PropTypes from 'prop-types'

export default function ProfileCard(props) {
    return (
        <div className={styles.simplified_profile_container}
             style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
            <Avatar src={props.pic} alt={props.name}/>
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

ProfileCard.propTypes={
    dark: PropTypes.bool,
    pic: PropTypes.string,
    name: PropTypes.string
}