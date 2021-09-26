import React, {useState} from "react";
import styles from "./styles/Apps.module.css";
import {AppsRounded} from "@material-ui/icons";
import AnimationFrame from "../navigation/templates/AnimationFrame";
import PropTypes from 'prop-types'
import ToolTip from "../../misc/tooltip/ToolTip";
import AppsWrapper from "./templates/AppsWrapper";
import App from "./templates/App";

export default function Apps(props) {
    const [open, setOpen] = useState(false)

    return (
        <div className={styles.appsContainer} onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget))
                setOpen(false)
        }}>

            <button
                className={styles.appsButtonContainer}

                onClick={() => setOpen(!open)}
                style={{
                    color: open ? 'white' : undefined,
                    backgroundColor: open ? '#0095ff' : null,
                    paddingTop: '16px',
                    paddingBottom: '16px'
                }}>
                <AppsRounded/>
            </button>
            <AnimationFrame render={open}>
                <div className={styles.floatingBox}>
                    <AppsWrapper>
                        {props.buttons.map((button, index) => (
                            <React.Fragment key={'app-button-' + index}>
                                <App
                                    redirect={props.redirect}
                                    disabled={button.disabled}
                                    label={button.label}
                                    icon={button.icon}
                                    path={button.path}
                                />
                            </React.Fragment>
                        ))}
                    </AppsWrapper>
                </div>
            </AnimationFrame>
        </div>
    )
}
Apps.propTypes = {
    redirect: PropTypes.func,
    lang: PropTypes.object,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            path: PropTypes.string,
            disabled: PropTypes.bool,
        })
    )
}
