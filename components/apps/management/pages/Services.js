import {Tab, Tabs} from "mfc-core";
import shared from '../styles/Shared.module.css'
import ServiceList from "../components/lists/ServiceList";
import EndpointList from "../components/lists/EndpointList";

import EntityList from "../components/lists/EntityList";
import {useState} from "react";

export default function Services(props) {
    const [open, setOpen] = useState(0)
    return (
        <Tabs className={shared.wrapper} open={open} setOpen={setOpen}>
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