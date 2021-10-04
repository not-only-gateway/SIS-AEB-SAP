import {useQuery} from "sis-aeb-core";
import {service_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import ServiceForm from "../forms/ServiceForm";
import Switcher from "../../../../core/misc/switcher/Switcher";
import PropTypes from "prop-types";

export default function ServiceList(props) {
    const hook = useQuery(service_query)
    const [openEntity, setOpenEntity] = useState(undefined)
    return (
        <Switcher openChild={openEntity ? 0 : 1}>

            <div style={{marginTop: '48px'}}>
                <ServiceForm initialData={openEntity ? openEntity : {}} handleClose={() => setOpenEntity(undefined)}/>
            </div>
            <List
                createOption={true}
                keys={[
                    {
                        key: 'id',
                        label: 'id',
                        type: 'number',
                    },
                    {
                        key: 'name',
                        label: 'Nome',
                        type: 'string',
                    },
                    {
                        key: 'description',
                        label: 'Descrição',
                        type: 'string',
                    },
                    {
                        key: 'host',
                        label: 'Host',
                        type: 'string',
                    }
                ]}
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