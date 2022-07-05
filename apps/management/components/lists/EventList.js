import {event_query} from "../../queries/queries";

import {eventKeys} from "../../keys/keys";


import {List, Modal, useQuery} from "mfc-core";

export default function EventList(props) {
    const hook = useQuery(event_query)
    return (
        <>
            <Modal animationStyle={'slide-right'} blurIntensity={.1} open={false} defaultBackground={true}
                   handleClose={() => null}>

            </Modal>
            <List
                createOption={true}
                keys={eventKeys} onRowClick={() => null}
                hook={hook} onlyVisualization={true}
                title={'Registros de eventos'}
            />
        </>

    )
}