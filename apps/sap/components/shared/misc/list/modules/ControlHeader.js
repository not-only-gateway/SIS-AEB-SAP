import PropTypes from 'prop-types'
import styles from '../styles/Control.module.css'
import ToolTip from "../../tooltip/ToolTip";

export default function ControlHeader(props) {
    return (
        !props.controlOptions ?
            null
            :
            <div className={styles.container} style={{
                width: ((props.controlOptions.length / 4) * 40) + '%'
            }}>
                {props.controlOptions.map((c, i) => (
                    <span key={'control-' + i} style={{width: ((4 / props.controlOptions.length) * 25) + '%'}}>
                    <button className={styles.button} onClick={() => {
                        let data = []
                        let selected = []
                        props.data.map(e => {
                            data = [...data, ...e]
                        })
                        props.selected.map((m) => {
                            if (data[m] !== null)
                                selected = [...selected, ...[data[m]]]
                        })
                        c.onClick(selected)
                    }} disabled={c.disabled === undefined ? props.disabled : c.disabled}>
                        {c.icon}
                        <div className={styles.label}>
                            {c.label}
                        </div>
                    </button>
                    <ToolTip content={c.label}/>
                </span>
                ))}
            </div>
    )
}

ControlHeader.propTypes = {
    controlOptions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.object,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),
    data: PropTypes.array,
    selected: PropTypes.array
}