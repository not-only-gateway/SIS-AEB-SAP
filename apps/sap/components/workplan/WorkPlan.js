import ProjectForm from "../index/ProjectForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import React, {useState} from "react";
import Tabs from "../shared/misc/tabs/Tabs";

import ProjectPT from "../../packages/locales/ProjectPT";
import PropTypes from 'prop-types'
import TedPT from "../../packages/locales/TedPT";
import TedForm from "../shared/TedForm";
import WorkPlanPT from "../../packages/locales/WorkPlanPT";
import WorkPlanForm from "./WorkPlanForm";
import GoalList from "./goal/GoalList";
import StatusList from "./StatusList";

export default function WorkPlan(props){
    const lang = WorkPlanPT
    const [openTab, setOpenTab] = useState(0)
    return(
        <div>

            <Tabs
                buttons={[
                    {
                        key: 0,
                        value: lang.workPlan,
                        content: (
                            <WorkPlanForm
                                returnToMain={() => {
                                    null
                                }}
                                handleChange={event => props.setWorkPlan(event)} id={props.workPlan.id}
                                create={false}
                                data={props.workPlan}/>
                        )
                    },

                    {
                        key: 1,
                        value: lang.status,
                        content:  <StatusList workPlan={props.workPlan}/>
                    }
                ]} type={'vertical'}
                setOpenTab={setOpenTab}
                openTab={openTab}
            />

        </div>
    )
}
WorkPlan.propTypes={
    workPlan: PropTypes.object,
    setWorkPlan: PropTypes.func,
}
