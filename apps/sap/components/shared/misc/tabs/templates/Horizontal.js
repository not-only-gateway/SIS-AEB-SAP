import PropTypes from 'prop-types'
import styles from '../styles/Tab.module.css'
import React from "react";

export default function Horizontal(props) {
    return (
        <div className={styles.container}>
            <div
                className={styles.tabsContainer}>
                {props.buttons.map((button) => (button !== null ?
                        <button
                            key={button.key + ' - ' + button.value}
                            onClick={() => props.setOpenTab(button.key)}
                            disabled={button.disabled}
                            className={styles.tabButtonContainer}
                            style={{
                                borderBottom: props.openTab === button.key ? '#0095ff 2px solid' : 'transparent 2px solid'
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
                    <div className={styles.contentContainer}>
                        {button.content}
                    </div>
                    :
                    null
                )
            )}

        </div>
    )
}

Horizontal.proptypes = {
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
