import PropTypes from 'prop-types'
import styles from '../styles/Vertical.module.css'
import React from "react";

export default function Vertical(props) {
    console.log('here')
    return (
        <div className={styles.container}>
            <div
                className={styles.buttons}>
                {props.buttons.map((button) => (button !== null ?
                        <button
                            key={button.key + ' - ' + button.value}
                            onClick={() => props.setOpenTab(button.key)}
                            disabled={button.disabled}
                            className={styles.button}
                            style={{
                                border: props.openTab === button.key ? 'transparent 1px solid' : undefined,
                                background: props.openTab === button.key ? '#E8F0FE' : undefined
                            }}
                        >
                            {button.value}
                        </button>
                        :
                        null
                    )
                )}
            </div>

            {props.buttons.map((button) => (button !== null && props.openTab === button.key ?
                    button.content
                    :
                    null
                )
            )}

        </div>
    )
}

Vertical.proptypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number,
            value: PropTypes.any,
            content: PropTypes.any
        })
    ),
    setOpenTab: PropTypes.func,
    openTab: PropTypes.number,
}
