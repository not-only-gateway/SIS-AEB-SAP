import Tabs from "../../../core/misc/tabs/Tabs";
import styles from '../styles/Services.module.css'
import ServiceList from "../components/lists/ServiceList";
import EndpointList from "../components/lists/EndpointList";
import EntityList from "../components/lists/EntityList";

export default function Endpoint() {
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