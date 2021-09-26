import styles from "../styles/EntityLayout.module.css";
import {ArrowBackRounded, MoreVertRounded} from "@material-ui/icons";
import React from "react";
import LayoutPropsTemplate from "./FormProps";
import PropTypes from "prop-types";
import SubmitButton from "./SubmitButton";

export default function Header(props) {
    return (
        <div className={styles.headerContainer} style={{display: props.noHeader ? 'none' : undefined}}>
            <div className={styles.header}>
                <button className={styles.buttonContainer}
                        style={{display: props.returnButton ? undefined : 'none'}}
                        onClick={() => props.handleClose()}>
                    <ArrowBackRounded/>
                </button>
                {props.label}

            </div>

            <button className={styles.buttonContainer} onClick={() => props.setOpenOptions(!props.openOptions)}
                    style={{
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        color: props.openOptions ? '#0095ff' : undefined,
                        background: props.openOptions ? '#E8F0FE' : undefined
                    }}>
                <MoreVertRounded/>
            </button>
            {props.openOptions ?
                <div className={styles.optionsContainer}>

                    {/*<button className={styles.buttonContainer}*/}
                    {/*        onClick={() => setOpenHistory(true)} disabled={true}>*/}
                    {/*    <HistoryRounded/>*/}
                    {/*    {lang.history}*/}

                    {/*</button>*/}
                    {/*<button className={styles.buttonContainer} disabled={true}>*/}
                    {/*    <InfoRounded/>*/}
                    {/*    {lang.info}*/}
                    {/*</button>*/}
                </div>
                :
                null
            }
        </div>
    )
}

Header.propTypes = {
    ...LayoutPropsTemplate,
    openOptions: PropTypes.bool,
    setOpenOptions: PropTypes.func
}