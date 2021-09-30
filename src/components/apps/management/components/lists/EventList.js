import { useQuery} from "sis-aeb-core";
import {event_query, permission_query, service_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import ServiceForm from "../forms/ServiceForm";

export default function EventList(props) {
    const hook = useQuery(event_query)

    const [openEntity, setOpenEntity] = useState(undefined)
    return (
        <>
            <div style={{display: !openEntity ? 'none' : undefined, marginTop: '48px'}}>
                <ServiceForm initialData={openEntity ? openEntity : {}} handleClose={() => setOpenEntity(undefined)}/>
            </div>
            <div style={{display: openEntity ? 'none' : undefined, padding: '0 32px'}}>
                <List
                    createOption={true}
                    keys={[
                        {
                            key: 'method',
                            label: 'Método',
                            type: 'number',
                        },
                        {
                            key: 'url',
                            label: 'URL',
                            type: 'string',
                        },
                        {
                            key: 'service',
                            label: 'Serviço',
                            type: 'object',
                            subfieldKey: 'name'
                        },
                        {
                            key: 'status_code',
                            label: 'Denominação',
                            type: 'string',
                        },
                        {
                            key: 'request_package_size',
                            label: 'Tamanho pacote entrada',
                            type: 'string',
                        },
                        {
                            key: 'response_package_size',
                            label: 'Tamanho pacote saida',
                            type: 'string',
                        }
                    ]}
                    hook={hook} onCreate={() => setOpenEntity({})}
                    onRowClick={row => setOpenEntity(row)}
                    title={'Registros de eventos'}
                />
            </div>
        </>
    )
}