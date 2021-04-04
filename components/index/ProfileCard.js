import React, {useEffect, useState} from 'react'
import styles from '../../styles/Profile.module.css'
import {Avatar, Button} from "@material-ui/core";

export default function ProfileCard(props){

    return(
        <div className={styles.profile_modal_container}>
            <div className={styles.title_container}>
                <Avatar src={props.profile.pic} style={{width: '120px', height: '120px'}}/>
                <p style={{fontSize: '1.1rem',fontWeight: 500,color: props.dark ? 'white': 'black', textAlign: 'center'}}>{props.profile.name}</p>
            </div>


            <div className={styles.profile_info_row} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                <p style={{fontSize: '1rem', fontWeight: 450, color: props.dark ? 'white': 'black'}}>Email</p>
                <p style={{fontSize: '.9rem' ,color: props.dark ? 'white': 'black'}}>{props.profile.corporate_email}</p>
            </div>
            <div className={styles.profile_info_row} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                <p style={{fontSize: '1rem', fontWeight: 450, color: props.dark ? 'white': 'black'}}>Extension</p>
                <p style={{fontSize: '.9rem',color: props.dark ? 'white': 'black'}}>{props.profile.extension}</p>
            </div>

            <div className={styles.profile_info_row} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                <p style={{fontSize: '1rem', fontWeight: 450, color: props.dark ? 'white': 'black'}}>Name</p>
                <p style={{fontSize: '.9rem' ,color: props.dark ? 'white': 'black'}}>{props.collaboration.unity.acronym} - {props.collaboration.unity.name}</p>
            </div>
            <div className={styles.profile_info_row} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                <p style={{fontSize: '1rem', fontWeight: 450, color: props.dark ? 'white': 'black'}}>Role</p>
                <p style={{fontSize: '.9rem' ,color: props.dark ? 'white': 'black'}}>{props.collaboration.role.denomination}</p>
            </div>
            {props.collaboration.senior !== null ?
                <div className={styles.profile_info_row} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid'), paddingBottom: '2vh'}}>
                    <p style={{fontSize: '1rem', fontWeight: 450, color: props.dark ? 'white': 'black'}}>Senior</p>
                    <div style={{backgroundColor: props.dark ? "#303741" : 'white', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                        <Avatar src={props.collaboration.senior.pic}/>
                    </div>
                </div>
                :
                null
            }
        </div>
    )

}