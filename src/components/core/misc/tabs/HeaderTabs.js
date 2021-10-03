import PropTypes from 'prop-types'
import React, {useState} from "react";
import styles from './styles/HeaderTabs.module.css'

export default function HeaderTabs(props) {
    const [open, setOpen] = useState(0)
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                {props.children}
                <div className={styles.tabs}>
                    {props.buttons.map((e, i) => (
                        <button key={i + '-button-header-tab'} className={[styles.button, open === i ? styles.highlight : ''].join(' ')} onClick={() => setOpen(i)}>
                            {e.label}
                        </button>
                    ))}
                </div>
            </div>
            {props.buttons.map((e, i) =>  open !== i ? null : (
                <div className={styles.contentWrapper}>
                    {e.children}
                </div>
            ))}
        </div>
    )
}

HeaderTabs.proptypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            children: PropTypes.node
        })
    ),
    children: PropTypes.node
}
