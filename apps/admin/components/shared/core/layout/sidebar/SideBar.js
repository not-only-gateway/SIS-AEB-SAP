import PropTypes from "prop-types";
import React, {useMemo, useState} from "react";
import styles from "./styles/SideBar.module.css";
import {BrightnessHighRounded, Brightness3Rounded} from "@material-ui/icons";

export default function SideBar(props) {
    const buttonStyle = useMemo(() => {
        return {
            width: props.open ? '100%' : undefined,
            display: props.open ? undefined : 'grid',
            gap: props.open ? undefined : '2px',
            justifyContent: props.open ? 'space-between' : 'center',
            justifyItems: props.open ? undefined : 'center',
            padding: props.open ? '8px' : undefined
        }
    }, [props.open])
    return (
        <div
            className={styles.wrapper} style={{width: !props.open ? '60px' : '225px'}}
        >
            <div className={styles.buttons}>
                {props.buttons.map((button, index) => (
                    <React.Fragment key={'side-bar-button-' + index}>
                        <button
                            className={styles.buttonContainer}
                            disabled={button.disabled}
                            onClick={() => button.onClick()}
                            style={{
                                ...buttonStyle, ...{
                                    backgroundColor: button.highlight ? '#0095ff' : undefined,
                                    color: button.highlight ? 'white' : undefined,
                                }
                            }}
                        >
                            {button.icon}
                            <div
                                className={[styles.buttonLabel, styles.overflowEllipsis].join(' ')}
                                style={{
                                    color: button.highlight ? 'white' : undefined,
                                    maxWidth: '100%',
                                    fontSize: props.open ? undefined : '.65rem',
                                    textAlign: props.open ? undefined : 'center',
                                }}>
                                {button.label}
                            </div>
                        </button>

                    </React.Fragment>
                ))}

                <button
                    className={styles.buttonContainer} style={
                    {
                        ...buttonStyle,
                        ...{
                            position: 'absolute',
                            bottom: 0,
                            width: 'calc(100% - 8px)',
                            transform: 'translateX(4px)'
                        }
                    }}
                    onClick={() => props.setOnDark(!props.onDark)}
                >
                    {props.onDark ?<Brightness3Rounded/> : <BrightnessHighRounded/>}
                    <div
                        className={[styles.buttonLabel, styles.overflowEllipsis].join(' ')}
                        style={{
                            maxWidth: '100%',
                            fontSize: props.open ? undefined : '.65rem',
                            textAlign: props.open ? undefined : 'center',
                        }}
                    >

                        {props.onDark ? 'Escuro' : 'Claro'}
                    </div>
                </button>
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
    setOpen: PropTypes.func,
    setOnDark: PropTypes.func,
    onDark: PropTypes.bool
}
