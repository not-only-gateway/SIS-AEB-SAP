import {useQuery} from "sis-aeb-core";
import {service_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import ServiceForm from "../forms/ServiceForm";

export default function ServiceList(props) {
    const hook = useQuery(service_query)
    const [openEntity, setOpenEntity] = useState(undefined)
    return (
        <>
            <div style={{display: !openEntity ? 'none' : undefined, marginTop: '48px'}}>
                <ServiceForm initialData={openEntity ? openEntity : {}} handleClose={() => setOpenEntity(undefined)}/>
            </div>
            <div style={{display: openEntity ? 'none' : undefined}}>
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
                    onRowClick={row => setOpenEntity(row)}
                    title={'Serviços registrados'}
                />
            </div>
        </>
    )
}