import {Tabs, Tab} from "mfc-core";
import shared from '../styles/Shared.module.css'
import ServiceList from "../components/lists/ServiceList";
import EndpointList from "../components/lists/EndpointList";

import EntityList from "../components/lists/EntityList";
import AccessProfileList from "../components/lists/AccessProfileList";
import PermissionList from "../components/lists/PermissionList";

export default function Services(props) {
    return (
        <Tabs className={shared.wrapper}>
            <Tab label={'Serviços'} className={shared.tabWrapper}>
                <ServiceList
                    redirect={props.redirect}/>
            </Tab>eList redirect={props.redirect}/>
            <Tab label={'Endpoints'} className={shared.tabWrapper}>
                <EndpointList
                    redirect={props.redirect}/>
            </Tab>
            <Tab label={'Entidades'} className={shared.tabWrapper}>
                <EntityList/>
            </Tab>
        </Tabs>
    )
}