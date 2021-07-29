import PropTypes from 'prop-types'
import styles from '../../styles/Frame.module.css'
import {AddRounded, RemoveRounded} from "@material-ui/icons";

export default function Scale(props) {
    return (
        <div className={styles.scaleContainer} style={{left: props.reduced ? '110px' : undefined}}  onContextMenu={event => event.preventDefault()}>
            <button className={styles.scaleButton} disabled={props.scale === 2} onClick={() => {
                if(props.scale < 2)
                props.setScale(props.scale + .25)
            }}>
                <AddRounded/>
            </button>
            <div className={styles.scaleInfo}>
                {props.scale}
            </div>
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
    setScale: PropTypes.func,
    scale: PropTypes.number,
    reduced: PropTypes.bool
}