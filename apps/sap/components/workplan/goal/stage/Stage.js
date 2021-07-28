import PropTypes from 'prop-types'

import React, {useState} from "react";

import StageForm from "./StageForm";
import Tabs from "../../../shared/misc/tabs/Tabs";
import GoalPT from "../../../../packages/locales/GoalPT";
import Modal from "../../../shared/misc/modal/Modal";

export default function Stage(props) {
    const lang = GoalPT
    const [openTab, setOpenTab] = useState(0)
    return (
       <Modal open={props.data !== null && props.data !== undefined && props.data.id !== undefined} handleClose={() => props.returnToMain()}>
           {props.data !== null && props.data !== undefined && props.data.id !== undefined ? <Tabs
               type={'vertical'}
               buttons={[
                   {
                       key: 0,
                       value: props.data.stage,
                       content: (
                           <div style={{width: '100%'}}>
                               <StageForm {...props}/>
                           </div>
                       )
                   }, {
                       key: 1,
                       value: lang.stages,
                       content: <div style={{width: '100%'}}>
                           {/*<StageList goal={props.data}/>*/}
                       </div>
                   }
               ]}
               setOpenTab={setOpenTab}
               openTab={openTab}
           /> : null}
       </Modal>
    )
}
Stage.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    goal: PropTypes.object
}
