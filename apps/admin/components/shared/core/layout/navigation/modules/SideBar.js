import PropTypes from "prop-types";
import React from "react";
import styles from "../styles/Navigation.module.css";

export default function SideBar(props) {


    return (
        <div
            className={styles.navigationTabsContainer} style={{width: !props.open ? undefined : '270px'}}
        >
            <div className={styles.modalButtonsContainer}>
                {props.buttons.map((button, index) => (
                    <React.Fragment key={'side-bar-button-' + index}>
                        <button
                            className={styles.buttonContainer}
                            disabled={button.disabled}
                            onClick={() => button.onClick()}
                            style={{
                                width: props.open ? '100%' : undefined,
                                display: props.open ? undefined : 'grid',
                                gap: props.open ? undefined : '2px',
                                justifyContent: props.open ? 'space-between' : 'center',
                                justifyItems: props.open ? undefined : 'center',
                                backgroundColor: button.highlight ? '#0095ff' : undefined,
                                color: button.highlight ? 'white' : undefined,
                                padding: props.open ? '8px' : undefined
                            }}
                        >
                            {props.icon}
                            <div
                                className={[styles.buttonLabel, styles.overflowEllipsis].join(' ')}
                                style={{
                                    color: button.highlight ? 'white' : undefined,
                                    maxWidth: '100%',
                                    fontSize: props.open ? undefined : '.65rem',
                                    textAlign: props.open ? undefined : 'center',
                                }}>
                                {props.label}
                            </div>
                        </button>

                    </React.Fragment>
                ))}
            </div>
        </div>
    )

}

SideBar.propTypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            onClick: PropTypes.func,
            highlight: PropTypes.bool
        })
    ),

    open: PropTypes.bool,
    setOpen: PropTypes.func
}
