import EventList from "../components/lists/EventList";
import shared from '../styles/Shared.module.css'

export default function Logs() {
    return (
        <div className={shared.pageContent} style={{padding: '16px 10%'}}>
            <EventList/>
        </div>
    )
}