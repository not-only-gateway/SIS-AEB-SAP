import styles from "../styles/Canvas.module.css";
import {AddRounded, RemoveRounded} from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";
import NodePT from "../locale/NodePT";

export default function NodeOptions(props) {

    const lang = NodePT

    if (props.open)
        return (
            <div
                 className={[styles.optionsContainer, props.open ? styles.fadeIn : styles.fadeOutAnimation].join(' ')}
            >
                {props.buttons !== undefined ? props.buttons.map((button, index) =>
                    (
                        <button key={index + '-' + button.key} onClick={() => {
                            if (button.extendButton)
                                props.setShowExtendedDependents(!props.showExtendedDependents)
                            else
                                props.handleButtonClick(props.entity, button.key)
                        }}>
                            {button.icon !== undefined ? button.icon : null}
                            {button.label}
                        </button>
                    )) : null}
                {props.dependentsSize > 0 && props.row === props.rowLimit ?

                    <button onClick={() => {
                        props.setExtended(!props.extended)
                    }}>
                        {props.extended ?
                            (
                                <>
                                    <RemoveRounded />
                                    {lang.less}
                                </>
                            )
                            :
                            (
                                <>
                                    <AddRounded />
                                    {lang.more}
                                </>
                            )

                        }
                    </button>
                    :
                    null}

            </div>
        )
    else
        return null
}

NodeOptions.propTypes = {
    rowLimit: PropTypes.number,
    row: PropTypes.number,
    setShowExtendedDependents: PropTypes.func,
    showExtendedDependents: PropTypes.bool,
    dependentsSize: PropTypes.number,
    elementHeight: PropTypes.number,
    entityKey: PropTypes.any,
    extendable: PropTypes.bool,
    handleButtonClick: PropTypes.func,
    entity: PropTypes.object,
    extended: PropTypes.bool,
    setExtended: PropTypes.func,
    open: PropTypes.bool,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.any,
            label: PropTypes.string,
            key: PropTypes.number
        }))
}