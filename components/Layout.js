import styles from '../styles/Layout.module.css'
import Cookies from 'universal-cookie/lib'
import NavBarComponent from "./bars/NavBar";
import SearchBarComponent from "./bars/SearchBar";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import shared from '../styles/Shared.module.css'
import {createMuiTheme} from "@material-ui/core";
import {setTheme} from "../config/Theme";

const cookies = new Cookies()

export default function Layout ({ children }) {
    const [dark, setDark] =  useState(false)
    const router = useRouter()
    const { locale } = router
    const theme = createMuiTheme({
        palette: {
            type: dark ? "dark" : "light"
        }
    });
    useEffect(() => {
        setDark(cookies.get('theme', {path: '/'}) === '0')
    }, [])

    const componentStyle = {
        backgroundColor: !dark ? 'white' : '#303741',
        color: !dark ? 'white' : 'white'
    }

    const changeTheme = () => {
        setDark(!dark)
        console.log(cookies.get('theme'))
        setTheme()
        console.log(cookies.get('theme'))
    }
    return (
        <div style={{
            backgroundColor: !dark ? '#f4f8fb' : '#262d37',
            color:  !dark ? '#111111' : 'white',
            width: '100%',
            minHeight:'100vh',
            overflow:'hidden'
        }}>
            <div style={componentStyle} className={styles.top}>
                {SearchBarComponent(dark, locale)}
            </div>
            <div>
                {router.pathname === '/settings' ?
                    children({dark, theme, changeTheme})
                :
                    children({dark, theme})
                }

            </div>
            <div style={componentStyle} className={styles.left}>
                <NavBarComponent dark={dark} locale={locale} path={router.pathname} changeTheme={changeTheme}/>
            </div>
        </div>
    )
}