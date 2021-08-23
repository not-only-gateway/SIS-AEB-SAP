import PropTypes from 'prop-types'
import React, {useState} from "react";
import StageForm from "./StageForm";
import Tabs from "../../../../shared/misc/tabs/Tabs";
import GoalPT from "../../../../../packages/locales/GoalPT";
import OperationList from "./OperationList";

export default function Stage(props) {
    const lang = GoalPT
    const [openTab, setOpenTab] = useState(0)

    return (
        <Tabs
            buttons={[
                {
                    key: 0,
                    value: lang.details,
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
            styles={{paddingLeft: '10%', paddingRight: '10%'}}
            setOpenTab={setOpenTab}
            openTab={openTab}
        />
    )
}
Stage.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    goal: PropTypes.object
}
