import Head from 'next/head'
import Cookies from 'universal-cookie/lib'
import styles from '../styles/auth/Auth.module.css'
import {Button} from "@material-ui/core";
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import {getLogo} from "../config/Theme";


export default function AuthLayout(props) {

    const logoStyle = {
        width: '15vw'
    }

    return (
        <div className={styles.auth_container}  style={{
            backgroundColor: '#39adf6',
            color: props.dark ? 'white' : '#111111'
        }}>
            <div style={{gridColumn: 1, display: 'grid', margin: 'auto', alignContent: 'center', rowGap: '2.5vh'}}>
                <img style={logoStyle} src={getLogo(props.dark)} alt={"aeb"}/>
            </div>
            <div className={styles.input_half_container} style={{backgroundColor: !props.dark ? 'white' : '#303741', boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0'}}>
                {props.children}
            </div>
        </div>
    )
}
