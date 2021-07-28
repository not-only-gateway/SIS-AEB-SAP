import PropTypes from 'prop-types'
import Tabs from "../../shared/misc/tabs/Tabs";

import React, {useState} from "react";

import StageList from "./stage/StageList";
import GoalForm from "./GoalForm";
import GoalPT from "../../../packages/locales/GoalPT";

export default function Goal(props) {
    const lang = GoalPT
    const [openTab, setOpenTab] = useState(0)
    return (

        <Tabs
            type={'vertical'}
            buttons={[
                {
                    key: 0,
                    value: props.data.goal_number,
                    content: (
                        <div style={{width: '100%'}}>
                            <GoalForm {...props}/>
                        </div>
                    )
                }, {
                    key: 1,
                    value: lang.stages,
                    content: <div style={{width: '100%'}}>
                        <StageList goal={props.data}/>
                    </div>
                }
            ]}
            setOpenTab={setOpenTab}
            openTab={openTab}
        />
    )
}
Goal.propTypes = {

    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    workPlan: PropTypes.object
}
