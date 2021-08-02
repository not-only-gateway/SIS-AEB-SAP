import PropTypes from 'prop-types'
import styles from '../../../styles/Menu.module.css'
import React from "react";

export default function Tabs(props) {
    return (
        <div className={styles.tabsContainer}>
            <div
                className={styles.tabNavigation}>
                {props.buttons.map((button) => (button !== null ?
                        <button
                            key={button.key + ' - ' + button.value}
                            onClick={() => props.setOpenTab(button.key)}
                            disabled={button.disabled}
                            className={styles.tabButtonContainer}
                            style={{
                                borderBottom: props.openTab === button.key ? '#0095ff 2.5px solid' : 'transparent 2.5px solid',
                                borderRadius: props.openTab === button.key ? undefined : '5px'
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
                    <div className={styles.contentContainer} key={button.key + '-content'}>
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
