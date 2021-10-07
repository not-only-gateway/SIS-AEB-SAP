import {useQuery} from "sis-aeb-core";
import {event_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";

export default function EventList(props) {
    const hook = useQuery(event_query)

    const [openEntity, setOpenEntity] = useState(undefined)
    return (

        <div style={{padding: '0 32px'}}>
            <List
                createOption={true}
                keys={}
                hook={hook} onCreate={() => setOpenEntity({})}
                onRowClick={row => setOpenEntity(row)}
                title={'Registros de eventos'}
            />
        </div>

    )
}