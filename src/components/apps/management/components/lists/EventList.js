import {useQuery} from "sis-aeb-core";
import {event_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {eventKeys} from "../../keys/keys";

export default function EventList(props) {
    const hook = useQuery(event_query)
    return (

        <div style={{padding: '0 32px'}}>
            <List
                createOption={true}
                keys={eventKeys}
                hook={hook}
                onRowClick={row => null}
                title={'Registros de eventos'}
            />
        </div>

    )
}