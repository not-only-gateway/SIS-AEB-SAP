import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import StageForm from "./StageForm";
import Tabs from "../../../shared/misc/tabs/Tabs";
import GoalPT from "../../../../packages/locales/GoalPT";
import Modal from "../../../shared/misc/modal/Modal";
import styles from '../../../../styles/WorkPlan.module.css'
import OperationList from "./OperationList";
import {CloseRounded} from "@material-ui/icons";

export default function Stage(props) {
    const lang = GoalPT
    const [openTab, setOpenTab] = useState(0)
    return (
        props.open && !props.create ?
            <div className={styles.modal} onMouseDown={event => {
                if (event.target.className === 'WorkPlan_modal__-sRn3')
                    props.returnToMain()
            }}>
                <div className={styles.stageModal}>
                    <button className={styles.closeButton} onClick={() => props.returnToMain()}>
                        <CloseRounded/>
                    </button>
                    {props.data !== null && props.data !== undefined ? <Tabs
                        buttons={[
                            {
                                key: 0,
                                value: 'Etapa',
                                content: (
                                    <div style={{width: '100%'}}>
                                        <StageForm {...props}/>
                                    </div>
                                )
                            }, {
                                key: 1,
                                value: lang.operations,
                                content: <div style={{width: '100%'}}>
                                    <OperationList stage={props.data}/>
                                </div>
                            }
                        ]}
                        setOpenTab={setOpenTab}
                        openTab={openTab}
                    /> : null}
                </div>
            </div>
            : null
    )
}
Stage.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    goal: PropTypes.object,
    open: PropTypes.bool,
}
