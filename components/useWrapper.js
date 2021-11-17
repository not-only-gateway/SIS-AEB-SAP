import {useRouter} from "next/router";
import useCookies from "./core/misc/useCookies";
import React, {useEffect, useMemo, useState} from "react";
import sapProps from "./apps/sap/sapProps";
import managementProps from "./apps/management/managementProps";
import hrProps from "./apps/hr/hrProps";
import intranetProps from "./apps/intranet/intranetProps";
import profileProps from "./apps/profile/profileProps";
import {Brightness3Rounded, BrightnessHighRounded, PersonRounded} from "@material-ui/icons";


export default function useWrapper() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const cookies = useCookies()
    const [profile, setProfile] = useState({})
    const [isManager, setIsManager] = useState(false)
    const [darkTheme, setDark] = useState(false)
    const setDarkTheme = (value) => {
        cookies.remove('theme')
        cookies.create({name: 'theme', value: value ? 'dark' : 'light'})

        setDark(value)
    }
    const [openAuthentication, setOpenAuthentication] = useState(false)
    const layoutParams = useMemo(() => {
        switch (true) {
            case router.pathname === '/':
                return intranetProps((url) => router.push(url, url), router.pathname, router.query)
            case router.pathname.includes('/profile'):
                return profileProps((url) => router.push(url, url), router.pathname, router.query)
            case router.pathname.includes('/sap'):
                return sapProps((url) => router.push(url, url), router.pathname, router.query)
            case router.pathname.includes('/management'):
                return managementProps((url) => router.push(url, url), router.pathname, router.query)
            case router.pathname.includes('/hr'):
                return hrProps((url) => router.push(url, url), router.pathname, router.query)
            default:
                return {sideBarButtons: []}
        }
    }, [router.pathname, router.query])
    useEffect(() => {
        setDark(cookies.get('theme') === 'dark')
    }, [])
    useEffect(() => {
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
    const requiresAuth = useMemo(() => {
        return layoutParams.requireAuth
    }, [layoutParams])


    const [profiles, setProfiles] = useState([])
    const setManager = (value) => {
        setIsManager(true)
        setProfile(value)
        sessionStorage.setItem('profile', JSON.stringify(value))
        sessionStorage.setItem('isManager', JSON.stringify(true))
    }

    useEffect(() => {
        setProfiles(sessionStorage.getItem('profiles') ? JSON.parse(sessionStorage.getItem('profiles')) : [])
    }, [])


    const sidebar = useMemo(() => {
        let res = [...layoutParams.sideBarButtons]
        if (router.query.page === 'profile' && profile && Object.keys(profile).length > 0 && !isManager && cookies.get('jwt'))
            res.push({
                label: 'Perfil',
                icon: <PersonRounded/>,
                onClick: () => router.push(router.pathname + '?page=profile'),
                highlight: router.query.page === 'profile',
                position: 'bottom'
            })

        return res
    }, [darkTheme, isManager, profile, layoutParams, router.query])



    return {
        loading, setLoading,
        sidebar,
        setManager,
        profile, profiles,
        layoutParams,
        openAuthentication,
        setOpenAuthentication,
        cookies,
        router, requiresAuth,
        setProfile,
        isManager,
        darkTheme,
        setDarkTheme
    }
}