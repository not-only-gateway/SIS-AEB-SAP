import React from 'react'
import styles from '../../../styles/pages/person/Person.module.css'
import {Avatar} from "@material-ui/core";
import PropTypes from 'prop-types'

export default function SimpleProfileCardLayout(props) {
    return (

        <div className={styles.simplified_profile_container}
             style={{backgroundColor: props.dark ? '#303741' : 'white', boxShadow: props.dark ? 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' : null}}>
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

SimpleProfileCardLayout.propTypes={
    dark: PropTypes.bool,
    pic: PropTypes.string,
    name: PropTypes.string
}