import {useRouter} from "next/router";
import useCookies from "./useCookies";
import React, {useEffect, useMemo, useRef, useState} from "react";
import sapProps from "../apps/sap/sapProps";
import managementProps from "../apps/management/managementProps";
import profileProps from "../apps/profile/profileProps";


export default function useWrapper() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const cookies = useCookies()
    const [profile, setProfile] = useState({})
    const [isManager, setIsManager] = useState(false)
    const [darkTheme, setDark] = useState(false)
    const [openAuthentication, setOpenAuthentication] = useState(false)
    const [profiles, setProfiles] = useState([])
    const init = useRef(false)

    const setDarkTheme = (value) => {
        cookies.remove('theme')
        cookies.create({name: 'theme', value: value ? 'dark' : 'light'})

        setDark(value)
    }

    const layoutParams = useMemo(() => {
        switch (true) {

            case router.pathname === '/profile':
                return profileProps((url) => router.push(url, url), router.pathname, router.query)
            case router.pathname === '/':
                return sapProps((url) => router.push(url, url), router.pathname, router.query)
            case router.pathname === '/management':
                return managementProps((url) => router.push(url, url), router.pathname, router.query)
            default:
                return {sideBarButtons: []}
        }
    }, [router.pathname, router.query])
    useEffect(() => {
        if (!init.current) {
            init.current = true
            setProfiles(sessionStorage.getItem('profiles') ? JSON.parse(sessionStorage.getItem('profiles')) : [])
            setDark(cookies.get('theme') === 'dark')
        }
        if (layoutParams.requireAuth)
            cookies.watch({
                name: 'jwt', callback: (cookie) => {
                    if (!cookie)
                        setOpenAuthentication(true)
                }
            })
        if (sessionStorage.getItem('profile') !== null && profile !== null && profile && Object.keys(profile).length === 0 && cookies.get('jwt')) {
            setProfile(JSON.parse(sessionStorage.getItem('profile')))
            if (sessionStorage.getItem('isManager'))
                setIsManager(JSON.parse(sessionStorage.getItem('isManager')))
        }

    }, [layoutParams])


    return {
        loading, setLoading,
        sidebar: layoutParams.sideBarButtons,
        setManager: (value) => {
            setIsManager(true)
            setProfile(value)
            sessionStorage.setItem('profile', JSON.stringify(value))
            sessionStorage.setItem('isManager', JSON.stringify(true))
        },
        profile, profiles,
        layoutParams,
        openAuthentication,
        setOpenAuthentication,
        cookies,
        router, requiresAuth: layoutParams.requireAuth,
        setProfile,
        isManager,
        darkTheme,
        setDarkTheme
    }
}