import styles from '../../styles/Layout.module.css'
import Cookies from 'universal-cookie/lib'
import NavBarComponent from "../navigation/NavBar";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import shared from '../../styles/Shared.module.css'
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import {setThemeCookie} from "../../config/Theme";

const cookies = new Cookies()

export default function Layout ({ children }) {

    const [dark, setDark] =  useState(false)
    const router = useRouter()
    const { locale } = router


    useEffect(() => {
        setDark(cookies.get('theme', {path: '/'}) === '0')

        if(locale !== cookies.get('lang') && cookies.get('lang') !== undefined)
            router.push(router.pathname, router.pathname, {locale: cookies.get('lang')}).catch(error => console.log(error))
    }, [])

    const componentStyle = {
        backgroundColor: !dark ? '#f4f8fb' : '#262d37',
        color: !dark ? 'white' : 'white'
    }

    const changeTheme = () => {
        setDark(!dark)
        setThemeCookie()
    }
    return (
        <div style={{color: dark? 'white': 'black'}}>
            <div className={styles.children_container} style={{backgroundColor: !dark ? 'white' : '#303741'}}>
                {router.pathname === '/settings' ?
                    children({ dark ,changeTheme})
                :
                    children()
                }
            </div>
            <div style={componentStyle} className={styles.left}>
                <NavBarComponent dark={dark} locale={locale} path={router.pathname}/>
            </div>
        </div>
    )
}