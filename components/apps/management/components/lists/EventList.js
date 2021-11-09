import {event_query} from "../../queries/queries";
import List from "../../../../core/visualization/list/List";
import {eventKeys} from "../../keys/keys";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import Modal from "../../../../core/navigation/modal/Modal";

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