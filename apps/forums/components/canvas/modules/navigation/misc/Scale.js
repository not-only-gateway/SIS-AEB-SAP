import PropTypes from 'prop-types'
import {AddRounded, RemoveRounded} from "@material-ui/icons";
import styles from './styles/Styles.module.css'


export default function Scale(props) {
    return (
        <div className={styles.scaleContainer}>
            <button className={styles.scaleButton} disabled={props.scale === 2} onClick={() => {
                if (props.scale < 2)
                    props.setScale(props.scale + .25)
            }}>
                <AddRounded/>
            </button>
            <div className={styles.scaleInfo}>
                {props.scale * 100}%
            </div>
            <button className={styles.scaleButton} disabled={props.scale === .5} onClick={() => {
                if (props.scale > .5)
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
}