import React, {useEffect, useState} from 'react'
import styles from '../../styles/Profile.module.css'
import {Avatar, Button} from "@material-ui/core";
import SimplifiedProfile from "./SimplifiedProfile";
import axios from "axios";
import Host from "../../config/Host";

export default function PersonProfile(props){
    useEffect(() => {
        fetchData().catch(error => console.log(error))
    }, [])

    const [collaboratorProfile, setCollab] = useState(null)

    const fetchData = async() => {
        try {
            await axios({
                method: 'get',
                url: Host() + 'person/active/collaborator',
                params:{
                    id: props.id
                }
            }).then(res => {
                setCollab(res.data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }



    return(
        <div className={styles.profile_container}>
            <div className={styles.title_container}>
                <Avatar src={collaboratorProfile?.pic} style={{width: '120px', height: '120px'}}/>
                <p style={{fontSize: '1.1rem',fontWeight: 500,color: props.dark ? 'white': 'black', textAlign: 'center'}}>{collaboratorProfile?.name}</p>
            </div>


            <div className={styles.profile_info_row} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                <p style={{fontSize: '1rem', fontWeight: 450, color: props.dark ? 'white': 'black'}}>Email</p>
                <p style={{fontSize: '.9rem' ,color: props.dark ? 'white': 'black'}}>{collaboratorProfile?.corporate_email}</p>
            </div>
            <div className={styles.profile_info_row} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                <p style={{fontSize: '1rem', fontWeight: 450, color: props.dark ? 'white': 'black'}}>Extension</p>
                <p style={{fontSize: '.9rem' ,color: props.dark ? 'white': 'black'}}>{collaboratorProfile?.extension}</p>
            </div>

            <div className={styles.profile_info_row} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                <p style={{fontSize: '1rem', fontWeight: 450, color: props.dark ? 'white': 'black'}}>Name</p>
                <p style={{fontSize: '.9rem' ,color: props.dark ? 'white': 'black'}}>{collaboratorProfile?.unity_name}</p>
            </div>
            <div className={styles.profile_info_row} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                <p style={{fontSize: '1rem', fontWeight: 450, color: props.dark ? 'white': 'black'}}>Role</p>
                <p style={{fontSize: '.9rem' ,color: props.dark ? 'white': 'black'}}>{collaboratorProfile?.role}</p>
            </div>
            <div className={styles.profile_info_row} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid'), paddingBottom: '2vh'}}>
                <p style={{fontSize: '1rem', fontWeight: 450, color: props.dark ? 'white': 'black'}}>Superior</p>
                <SimplifiedProfile name={collaboratorProfile?.supervisor.name} pic={collaboratorProfile?.supervisor.pic} dark={props.dark}/>
            </div>
        </div>
    )

}