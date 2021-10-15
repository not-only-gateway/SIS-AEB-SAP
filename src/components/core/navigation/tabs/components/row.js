import styles from "../styles/Vertical.module.css";
import {ArrowDropDownRounded} from "@material-ui/icons";
import React, {useState} from "react";
import PropTypes from "prop-types";
import Switcher from "../../../misc/switcher/Switcher";

export default function Row(props) {
    const [hidden, setHidden] = useState(false)

    return (
        <div>
            <button
                className={[styles.rowLabel, styles.button].join(' ')}
                onClick={() => setHidden(!hidden)}
                style={{display: props.data.label ? undefined : 'none'}}
            >
                {props.data.label}
                <ArrowDropDownRounded
                    style={{transform: hidden ? 'rotate(180deg)' : "unset", transition: '150ms linear'}}/>
            </button>
            <Switcher openChild={hidden ? 0 : 1}>
                <div/>
                <div>
                    {props.data.buttons.map((b, bI) => (
                        <button
                            key={props.index + '-button-header-tab-' + bI}
                            className={[styles.button, props.open.classSelected === props.index && props.open.rowSelected === bI ? styles.highlight : ''].join(' ')}
                            onClick={() => {
                                props.setOpen({classSelected: props.index, rowSelected: bI})
                            }}>
                            {b.label}
                        </button>
                    ))}
                </div>
            </Switcher>
        </div>
    )
}

Row.propTypes = {
    data: PropTypes.shape({
        label: PropTypes.string,
        buttons: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                children: PropTypes.node,
                onClick: PropTypes.func
            })
        ),
    }),
    index: PropTypes.number,
    setOpen: PropTypes.func,
    open: PropTypes.object
}