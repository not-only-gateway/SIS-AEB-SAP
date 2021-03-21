import styles from '../../styles/Layout.module.css'
import Cookies from 'universal-cookie/lib'
import NavBarComponent from "../bar/NavBar";
import SearchBar from "../bar/SearchBar";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import shared from '../../styles/Shared.module.css'
import {createMuiTheme} from "@material-ui/core";
import {setTheme} from "../../config/Theme";

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
        if(locale !== cookies.get('lang') && cookies.get('lang') !== undefined)
            router.push(router.pathname, router.pathname, {locale: cookies.get('lang')}).catch(error => console.log(error))
    }, [])

    const componentStyle = {
        backgroundColor: !dark ? '#f4f8fb' : '#262d37',
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
            color:  !dark ? '#111111' : 'white',
            width: '100%',
            minHeight:'100vh',
            overflow:'hidden'
        }}>
            {/*<div style={componentStyle} className={styles.top}>*/}
            {/*    <SearchBar locale={locale} dark={dark}/>*/}
            {/*</div>*/}
            <div className={styles.children_container} style={{backgroundColor: !dark ? 'white' : '#303741'}}>
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