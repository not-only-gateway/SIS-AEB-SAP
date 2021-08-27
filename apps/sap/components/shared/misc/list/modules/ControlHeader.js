import PropTypes from 'prop-types'
import styles from '../styles/Control.module.css'
import ToolTip from "../../tooltip/ToolTip";

export default function ControlHeader(props) {
    return (
        <div className={styles.container}>
            {props.controlOptions !== undefined && props.controlOptions.map((c, i) => (
                <div>
                    <button key={'control-' + i} className={styles.button} onClick={() => {
                        let data = []
                        let selected = []
                        props.data.map(e => {
                            data = [...data, ...e]
                        })
                        props.selected.map((m) => {
                            if(data[m] !== null)
                                selected = [...selected, ...[data[m]]]
                        })
                        c.onClick(selected)
                    }} disabled={props.disabled || c.disabled}>
                        {c.icon}
                        {c.label}
                    </button>
                    <ToolTip content={c.label}/>
                </div>
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