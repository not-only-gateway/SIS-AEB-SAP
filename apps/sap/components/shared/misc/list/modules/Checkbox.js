import styles from '../styles/Checkbox.module.css'
import PropTypes from 'prop-types'
import {CheckRounded} from "@material-ui/icons";

export default function Checkbox(props) {
    return (
        <div style={{padding: '0 12px'}}>
        <div className={styles.container}
             style={{
                 display: props.noSelect ? 'none' : undefined,
                 background: props.checked ? '#0095ff' : undefined,
                 border: props.checked ? '#0095ff 1px solid' : undefined
             }}
             onClick={() => props.handleCheck(props.checked)}>
            <CheckRounded style={{color: 'white', display: props.checked ? undefined : 'none', fontSize: '100%'}}/>
        </div>
        </div>
    )
}
Checkbox.propTypes = {
    checked: PropTypes.bool,
    handleCheck: PropTypes.func,
    noSelect: PropTypes.bool
}