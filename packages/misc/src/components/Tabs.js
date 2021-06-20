import PropTypes from 'prop-types'
import styles from './styles/Tab.module.css'
import React from "react";
import animations from './styles/Animations.module.css'

export default function Tabs(props) {
    return (
        <div
            className={styles.tabsContainer}>
            {props.buttons.map((button) => (button !== null ?
                    <button
                        key={button.key + ' - ' + button.value}
                        onClick={() => props.setOpenTab(button.key)}
                        disabled={button.disabled}
                        className={[styles.tabButtonContainer, animations.fadeIn].join(' ')}
                        style={{
                            borderBottom: props.openTab === button.key ? '#0095ff 2.5px solid' : 'white 2.5px solid',
                            color: props.openTab === button.key ? '#0095ff' : undefined
                        }}
                    >
                        {button.value}
                    </button>
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
            value: PropTypes.any
        })
    ),
    setOpenTab: PropTypes.func,
    openTab: PropTypes.number,
}
