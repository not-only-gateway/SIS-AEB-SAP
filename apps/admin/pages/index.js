import React from 'react'
import ManagementPT from "../packages/locales/management/ManagementPT";
import Head from "next/head";
import List from "../components/shared/core/list/List";
import PersonKeys from "../packages/KEYS/PersonKeys";
import Host from "../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import useQuery from "../components/shared/core/shared/hooks/useQuery";


export default function management() {
    const lang = ManagementPT
    const hook = useQuery({
        url: Host() + 'test/list/person',
        headers: {'authorization': new Cookies().get('jwt')},
        parsePackage: pack => pack,
        fetchSize: 15,
        identificationKey: 'id',
    })
    return (
        <>
            <Head>
                <title>{lang.title}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <List
                hook={hook}
                keys={PersonKeys}
                title={'Pessoas e colaboradores'}
                controlButtons={[]}
                onRowClick={() => null}
            />
        </>
    )

}
