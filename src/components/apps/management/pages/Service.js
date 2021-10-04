import Tabs from "../../../core/misc/tabs/Tabs";
import styles from '../styles/Services.module.css'
import ServiceList from "../components/lists/ServiceList";
import EndpointList from "../components/lists/EndpointList";
import {useEffect, useState} from "react";
import {Requester} from "sis-aeb-core";
import PropTypes from "prop-types";
import Host from "../utils/shared/Host";
import {useRouter} from "next/router";
import useCookies from "../../../core/shared/hooks/useCookies";

export default function Service() {
    const [entity, setEntity] = useState()
    const cookies = useCookies()
    const router = useRouter()
    useEffect(() => {
        Requester({
            headers: {'authorization': cookies.get('jwt')},
            package: PropTypes.object,
            url: Host('/gateway') + '/service/' + router.query.id,
            method: PropTypes.oneOf(['get', 'put', 'post', 'delete', 'patch']),
            showSuccessAlert: PropTypes.bool
        }).then(e => setEntity(e.data))
    }, [])

    return (
        <Tabs
            buttons={[
            {
                label: 'Serviços',
                children: (
                    <div className={styles.contentWrapper}>
                        <ServiceList/>
                    </div>
                )
            },
            {
                label: 'Endpoints',
                children: (
                    <div className={styles.contentWrapper}>
                        <EndpointList/>
                    </div>
                )
            }
        ]}>
            <div className={styles.header}>
                {}
            </div>
        </Tabs>
    )
}