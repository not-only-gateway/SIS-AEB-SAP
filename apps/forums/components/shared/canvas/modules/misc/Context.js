import PropTypes from 'prop-types'
import styles from './styles/Styles.module.css'

export default function Context(props) {
    return (
        <div className={styles.context}>
            {props.buttons.map(button => (
                <button onClick={() => button.onClick()} disabled={button.disabled} className={styles.contextButton}>
                    {button.label}
                </button>
            ))}
        </div>
    )
}
Context.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    }))
}
