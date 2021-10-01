import {useQuery} from "sis-aeb-core";
import {endpoint_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import EndpointForm from "../forms/EndpointForm";

export default function EndpointList(props) {
    const hook = useQuery(endpoint_query)
    const [openEntity, setOpenEntity] = useState(undefined)
    return (
        <>
            <div style={{display: !openEntity ? 'none' : undefined, marginTop: '48px'}}>
                <EndpointForm initialData={openEntity ? openEntity : {}} handleClose={() => setOpenEntity(undefined)}/>
            </div>
            <div style={{display: openEntity ? 'none' : undefined}}>
                <List
                    keys={[
                        {
                            key: 'id',
                            label: 'id',
                            type: 'number',
                        },
                        {
                            key: 'url',
                            label: 'URL',
                            type: 'string',
                        },
                        {
                            key: 'method',
                            label: 'Método HTTP',
                            type: 'string',
                            getColor: (value) => {
                                switch (value.toLowerCase()) {
                                    case 'post': {
                                        return 'yellow'
                                    }
                                    case 'get': {
                                        return 'green'
                                    }
                                    case 'put': {
                                        return 'blue'
                                    }
                                    case 'delete': {
                                        return '#ff5555'
                                    }
                                    default:
                                        return undefined
                                }
                            }
                        },
                        {
                            key: 'require_auth',
                            label: 'Requer autenticação',
                            type: 'bool',
                        },
                        {
                            key: 'service',
                            label: 'Serviço',
                            type: 'object',
                            subfieldKey: 'name',
                        }
                    ]}
                    hook={hook} createOption={true}
                    onRowClick={row => setOpenEntity(row)}
                    onCreate={() => setOpenEntity({})}
                    title={'Endpoints registrados'}
                />
            </div>
        </>
    )
}