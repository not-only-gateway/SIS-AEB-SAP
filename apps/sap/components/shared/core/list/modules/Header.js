import PropTypes from 'prop-types'
import styles from "../styles/List.module.css";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";
import {AddRounded} from "@material-ui/icons";
import React from "react";

export default function ListHeader(props) {
    return (

        <div className={styles.titleContainer}>
            {props.title}
        </div>
    )
}

ListHeader.propTypes = {
    setEntity: PropTypes.func,
    clickEvent: PropTypes.func,
    title: PropTypes.any,
    refresh: PropTypes.func,
    createOption: PropTypes.bool
}

