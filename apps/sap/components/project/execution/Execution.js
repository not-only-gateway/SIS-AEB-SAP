import PropTypes from "prop-types";
import React, {useState} from "react";
import Tabs from "../../shared/misc/tabs/Tabs";
import ExecutionForm from "./ExecutionForm";
import ExecutionPT from "../../../packages/locales/ExecutionPT";
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
                styles={{paddingLeft: '10%', paddingRight: '10%'}}
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