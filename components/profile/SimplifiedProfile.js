import React from 'react'
import styles from '../../styles/Profile.module.css'
import {Avatar} from "@material-ui/core";

export default class SimplifiedProfile extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className={styles.simplified_profile_container} style={{backgroundColor: this.props.dark ? '#3b424c' : 'white'}}>
                <Avatar src={this.props.pic} alt={this.props.name}/>
                <div style={{color: this.props.dark ? 'white':'black',
                    fontSize: '.9rem',
                    maxWidth: '60%',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                }}>{this.props.name}</div>

            </div>
        )
    }
}
