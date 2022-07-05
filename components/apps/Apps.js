import React from "react";
import styles from "./styles/Apps.module.css";
import PropTypes from 'prop-types'
import {Dropdown, ToolTip} from "mfc-core";

export default function Apps(props) {

    return (
        <Dropdown
            align={"top"} justify={'start'}
            className={styles.buttonContainer}
            options={props.buttons}
            variant={'minimal-horizontal'}
            styles={{
                paddingLeft: '2px',
                paddingRight: '2px',
            }}
        >
            <span className="material-icons-round">apps</span>
            <ToolTip content={'Sistemas'} align={"middle"} justify={'end'}/>
        </Dropdown>
    )
}
Apps.propTypes = {

    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            disabled: PropTypes.bool,
            onClick: PropTypes.func.isRequired
        })
    )
}
