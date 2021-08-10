import PropTypes from "prop-types";
import React from "react";
import styles from "../styles/Navigation.module.css";
import NavigationButton from "./NavigationButton";

export default function NavigationTabs(props) {


    return (
        <div
            className={styles.navigationTabsContainer} style={{width: !props.open ? undefined : '270px'}}
        >
            <div className={styles.modalButtonsContainer}>
                {props.buttons.map((button, index) => button !== null ? (
                    <React.Fragment key={button.label + index}>
                        <NavigationButton
                            buttonKey={index}
                            linkPath={button.link}
                            linkQuery={button.linkProps}
                            highlight={props.path === button.link}
                            icon={
                                button.icon
                            } extended={props.open}
                            label={button.label}
                        />
                    </React.Fragment>
                ) : null)}
            </div>
        </div>
    )

}

NavigationTabs.propTypes = {
    logo: PropTypes.any,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            link: PropTypes.string,
            linkProps: PropTypes.any
        })
    ),
    path: PropTypes.string,
    open: PropTypes.bool,
    setOpen: PropTypes.func
}
