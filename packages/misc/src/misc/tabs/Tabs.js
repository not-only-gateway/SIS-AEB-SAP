import PropTypes from 'prop-types'
import styles from './styles/Tab.module.css'
import React from "react";

export default function Tabs(props) {
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
                                border: props.openTab === button.key ? '#0095ff 2.5px solid' : 'transparent 2.5px solid',
                                background: props.openTab === button.key ? '#E8F0FE' : undefined,
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

Tabs.proptypes = {
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
