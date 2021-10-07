import {useQuery} from "sis-aeb-core";
import {service_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import ServiceForm from "../forms/ServiceForm";
import Switcher from "../../../../core/misc/switcher/Switcher";
import PropTypes from "prop-types";
import {serviceKeys} from "../../keys/keys";

export default function ServiceList(props) {
    const hook = useQuery(service_query)
    const [openEntity, setOpenEntity] = useState(undefined)
    return (
        <Switcher openChild={openEntity ? 0 : 1}>

            <div style={{marginTop: '48px'}}>
                <ServiceForm initialData={openEntity ? openEntity : {}}
                             handleClose={() => {
                                 setOpenEntity(undefined)
                                 hook.clean()
                             }}
                />
            </div>
            <List
                createOption={true}
                keys={serviceKeys}
                hook={hook} onCreate={() => setOpenEntity({})}
                onRowClick={row => props.redirect(row.id)}
                title={'Serviços registrados'}
            />
        </Switcher>
    )
}
ServiceList.propTypes={
    redirect: PropTypes.func
}