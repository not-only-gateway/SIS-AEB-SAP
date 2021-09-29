import PropTypes from 'prop-types'
import styles from './styles/Vertical.module.css'
import React from "react";
import ToolTip from "../tooltip/ToolTip";

export default function VerticalTabs(props) {

    return (
        <div className={styles.container}>
            <div
                className={styles.buttons}>
                {props.buttons.map((button, i) => (button !== null ?
                        <span>
                            <ToolTip content={button.value}/>
                            <button
                                key={button.key + ' - ' + button.value} id={button.key + ' - ' + button.value}
                                onClick={() => props.setOpenTab(button.key)}
                                disabled={button.disabled}
                                className={styles.button}
                                style={{
                                    borderLeft: props.openTab === button.key ? '#0095ff 2px solid' : undefined,
                                    background: props.openTab === button.key ? '#E8F0FE' : undefined
                                }}
                            >
                                {button.value}

                            </button>

                        </span>
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

VerticalTabs.proptypes = {
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
