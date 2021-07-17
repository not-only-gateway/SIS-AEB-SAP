import PropTypes from 'prop-types'
import styles from '../styles/Frame.module.css'
import {AddRounded, RemoveRounded} from "@material-ui/icons";

export default function Scale(props) {
    return (
        <div className={styles.scaleContainer}>
            <button className={styles.scaleButton} disabled={props.scale === 2} style={{borderRadius: '5px 5px 0 0'}} onClick={() => {
                if(props.scale < 2)
                props.setScale(props.scale + .25)
            }}>
                <AddRounded/>
            </button>
            <button className={styles.scaleButton} disabled={props.scale === .5} style={{borderRadius: '0 0 5px 5px'}} onClick={() => {
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
    scale: PropTypes.number
}