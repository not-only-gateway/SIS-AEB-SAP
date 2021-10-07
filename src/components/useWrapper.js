import {useRouter} from "next/router";
import useCookies from "./core/shared/hooks/useCookies";
import React, {useEffect, useMemo, useState} from "react";
import sapProps from "./apps/sap/sapProps";
import managementProps from "./apps/management/managementProps";
import {fetchProfile} from "../utils/fetch";

export default function useWrapper() {
    const router = useRouter()

    const cookies = useCookies()
    const [profile, setProfile] = useState({})
    const [openAuthentication, setOpenAuthentication] = useState(false)
    const layoutParams = useMemo(() => {
        switch (true) {
            case router.pathname.includes('/sap'):
                return sapProps((url) => router.push(url, url), router.pathname, router.query)
            case router.pathname.includes('/management'):
                return managementProps((url) => router.push(url, url), router.pathname, router.query)
            default:
                return {}
        }
    }, [router.pathname, router.query])

    useEffect(() => {
        if (layoutParams.requireAuth)
            cookies.watch({
                name: 'jwt', callback: (cookie) => {
                    // if(!cookie)
                    //     setOpenAuthentication(true)
                }
            })
        if(Object.keys(profile).length === 0  && cookies.get('jwt'))
            setProfile(JSON.parse(sessionStorage.getItem('profile')))
        if (sessionStorage.getItem('profile') === null && cookies.get('jwt') && Object.keys(profile).length === 0 && !JSON.parse(cookies.get('asManager')))
            fetchProfile().then(profile => {
                if (profile.person !== null) {
                    sessionStorage.setItem('profile', JSON.stringify(profile))
                    setProfile({
                        email: profile.collaborator?.corporate_email,
                        name: profile.person.name,
                        image: null
                    })
                }

            })
    }, [layoutParams])

    return {profile, layoutParams, openAuthentication, setOpenAuthentication, cookies, router, setProfile}
}