import PropTypes from 'prop-types'
import styles from '../styles/Frame.module.css'
import {AddRounded, RemoveRedEye, RemoveRounded} from "@material-ui/icons";

export default function Scale(props) {
    return (
        <div className={styles.scaleContainer}>
            <button className={styles.scaleButton} disabled={props.scale === 2} onClick={() => {
                if(props.scale < 2)
                props.setScale(props.scale + .25)
            }}>
                <AddRounded/>
            </button>
            <button className={styles.scaleButton} disabled={props.scale === .5} onClick={() => {
                if(props.scale > .5)
                props.setScale(props.scale - .25)
            }}>
                <RemoveRounded/>
            </button>
        </div>
    )
}
Scale.propTypes = {
    setCanvasScale: PropTypes.func,
    scale: PropTypes.number
}