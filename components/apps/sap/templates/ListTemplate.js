import PropTypes from "prop-types";
import {Button, Modal} from "mfc-core";
import styles from '../styles/Shared.module.css'

export default function ListTemplate(props) {
    return (
        <Modal open={props.open} handleClose={props.onDecline} className={styles.notificationModal} blurIntensity={.1}>
            <div>
                {props.message}
            </div>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <Button variant={"filled"} onClick={() => props.onDecline()}>
                    Não
                </Button>
                <Button onClick={() => props.onAccept()} color={'secondary'} >
                    Sim!
                </Button>
            </div>
        </Modal>
    )
}
ListTemplate.propTypes = {
    open: PropTypes.bool.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
}