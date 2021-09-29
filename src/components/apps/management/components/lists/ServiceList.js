import { useQuery} from "sis-aeb-core";
import {service_query} from "../../queries/queries";
import List from "../../../../core/list/List";

export default function ServiceList(props) {
    const hook = useQuery(service_query)

    return (
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
            hook={hook} onCreate={() => null}
            onRowClick={row => null}
            title={'Serviços registrados'}
        />
    )
}