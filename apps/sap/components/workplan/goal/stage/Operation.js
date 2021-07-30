import PropTypes from 'prop-types'


import React, {useState} from "react";

import OperationForm from "./OperationForm";
import OperationPT from "../../../../packages/locales/OperationPT";
import Tabs from "../../../shared/misc/tabs/Tabs";
import ActionList from "./ActionList";
import ExecutionList from "./ExecutionList";
import FollowUpList from "./FollowUpList";

export default function Operation(props) {
    const lang = OperationPT
    const [openTab, setOpenTab] = useState(0)
    return (
        props.create ?
            <OperationForm {...props}/>
            :
            <Tabs
                type={'vertical'}
                buttons={[
                    {
                        key: 0,
                        value: props.data.phase,
                        content: (
                            <div style={{width: '100%'}}>
                                <OperationForm {...props}/>
                            </div>
                        )
                    }, {
                        key: 1,
                        value: lang.action,
                        content: <div style={{width: '100%'}}>
                            <ActionList operation={props.data}/>
                        </div>
                    },
                    {
                        key: 2,
                        value: lang.execution,
                        content: <div style={{width: '100%'}}>
                            <ExecutionList operation={props.data}/>
                        </div>
                    },
                    {
                        key: 3,
                        value: lang.followUpGoal,
                        content: <div style={{width: '100%'}}>
                            <FollowUpList operation={props.data}/>
                        </div>
                    }
                ]}
                setOpenTab={setOpenTab}
                openTab={openTab}
            />
    )
}
Operation.propTypes = {

    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    stage: PropTypes.object
}