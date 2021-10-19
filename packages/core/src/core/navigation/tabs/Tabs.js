import PropTypes from 'prop-types'
import React, {useState} from "react";
import styles from './styles/Tabs.module.css'
import Switcher from "../../misc/switcher/Switcher";

export default function Tabs(props) {
    const [open, setOpen] = useState(0)

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                {props.children}
                <div className={styles.tabs}>
                    {props.buttons.map((e, i) => (
                        <button key={i + '-button-header-tab'}
                                className={[styles.button, open === i ? styles.highlight : ''].join(' ')}
                                onClick={() => {
                                    if(e.onClick !== undefined)
                                        e.onClick()
                                    setOpen(i)
                                }}>
                            {e.label}
                        </button>
                    ))}
                </div>
            </div>
            <Switcher openChild={open}>
                {props.buttons.map(e => e.children)}
            </Switcher>
        </div>
    )
}

Tabs.proptypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            children: PropTypes.node,
            onClick: PropTypes.func
        })
    ),
    children: PropTypes.node
}
