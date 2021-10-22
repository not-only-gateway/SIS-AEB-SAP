import Tabs from "../../../core/navigation/tabs/Tabs";
import styles from '../styles/Shared.module.css'
import ServiceList from "../components/lists/ServiceList";
import EndpointList from "../components/lists/EndpointList";

import EntityList from "../components/lists/EntityList";

export default function Services(props) {
    return (
        <Tabs
            buttons={[
                {
                    label: 'Serviços',
                    children: (
                        <div className={styles.contentWrapper}>
                            <ServiceList
                                redirect={props.redirect}/>
                        </div>
                    )
                },
                {
                    label: 'Endpoints',
                    children: (
                        <div className={styles.contentWrapper}>
                            <EndpointList
                                redirect={props.redirect}/>
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