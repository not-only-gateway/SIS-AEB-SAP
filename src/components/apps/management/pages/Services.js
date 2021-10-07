import Tabs from "../../../core/misc/tabs/Tabs";
import styles from '../styles/Services.module.css'
import ServiceList from "../components/lists/ServiceList";
import EndpointList from "../components/lists/EndpointList";
import {useRouter} from "next/router";
import EntityList from "../components/lists/EntityList";

export default function Services() {

    const router = useRouter()

    return (
        <Tabs
            buttons={[
                {
                    label: 'Serviços',
                    children: (
                        <div className={styles.contentWrapper}>
                            <ServiceList
                                redirect={id => router.push('/management/service', '/management/service', {query: {id: id}})}/>
                        </div>
                    )
                },
                {
                    label: 'Endpoints',
                    children: (
                        <div className={styles.contentWrapper}>
                            <EndpointList
                                redirect={id => router.push('/management/endpoint', '/management/endpoint', {query: {id: id}})}/>
                        </div>
                    )
                },
                {
                    label: 'Entidades',
                    children: (
                        <div className={styles.contentWrapper}>
                            <EntityList/>
                        </div>
                    )
                }
            ]}>
            <div className={styles.header}>
                Gerênciamento dos serviços
            </div>
        </Tabs>
    )
}