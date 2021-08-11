import PropTypes from "prop-types";
import WorkPlan from "../workplan/WorkPlan";
import WorkPlanPT from "../../../packages/locales/WorkPlanPT";
import React, {useState} from "react";
import Tabs from "../../shared/misc/tabs/Tabs";
import ExecutionForm from "./ExecutionForm";
import ExecutionPT from "../../../packages/locales/ExecutionPT";
import OperationList from "../workplan/goal/stage/OperationList";
import NoteList from "./NoteList";

export default function Execution(props) {
    const lang = ExecutionPT
    const [openTab, setOpenTab] = useState(0)

    return (
        <div>
            <Tabs
                buttons={[
                    {
                        key: 0,
                        value: lang.execution,
                        content: (
                            <ExecutionForm
                                handleChange={props.setExecution}
                                id={props.execution.id} create={false}
                                data={props.execution}
                            />
                        )
                    },
                    {
                        key: 1,
                        value: lang.notes,
                        content:  <div style={{width: '100%'}}>
                            <NoteList execution={props.execution}/>
                        </div>
                    }
                ]}
                setOpenTab={setOpenTab}
                openTab={openTab}
            />
        </div>
    )
}
Execution.propTypes = {
    execution: PropTypes.object,
    setExecution: PropTypes.func,
    setNote: PropTypes.func
}