import HeaderTabs from "../../../core/misc/tabs/HeaderTabs";
import styles from '../styles/Services.module.css'
import ServiceList from "../components/lists/ServiceList";
import EndpointList from "../components/lists/EndpointList";

export default function Services() {
    return (
        <HeaderTabs
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
                Gerênciamento dos serviços
            </div>
        </HeaderTabs>
    )
}