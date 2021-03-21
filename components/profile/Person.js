import React from 'react'
import styles from '../../styles/Profile.module.css'
import {Avatar, Button} from "@material-ui/core";

export default class Person extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className={styles.profile_container}>
                <div className={styles.title_container}>
                    <Avatar src={'https://rollingstone.uol.com.br/media/_versions/marcos_jeeves_teaser_reprod_widemd.jpg'} style={{width: '8vh', height: '8vh'}}/>
                    {/*<Avatar src={this.props.pic} alt={this.state.profile.name}/>*/}
                    {/*<p>{this.state.profile.name}</p>*/}
                    <p style={{color: (this.props.dark? 'white': 'black'), fontSize: '1.2rem', fontWeight: 440}}>Gustavo Roque</p>
                </div>
                <div className={styles.profile_info_row}>
                    <p>Name</p>
                </div>
                <div className={styles.profile_info_row}>
                    <p>Email</p>
                </div>
                <div className={styles.profile_info_row}>
                    <p>Extension</p>
                </div>
                <div className={styles.profile_info_row}>
                    <p>Unity</p>
                </div>
                <div className={styles.profile_info_row}>
                    <p>Role</p>
                </div>
                <div className={styles.profile_info_row}>
                    <p>Superior</p>
                    <Button>Juan</Button>
                </div>
            </div>
        )
    }
}