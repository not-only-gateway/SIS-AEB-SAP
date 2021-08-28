import PropTypes from 'prop-types'


import React, {useState} from "react";

import OperationForm from "./OperationForm";
import OperationPT from "../../../../packages/locales/OperationPT";
import Tabs from "../../../shared/core/tabs/Tabs";
import ActionItemList from "../action_item/ActionItemList";
import ExecutionList from "../execution/ExecutionList";
import FollowUpList from "../f_goal/FollowUpList";
import PermanentGoodsList from "../permanent/PermanentGoodsList";
import ResourceApplicationList from "../resource/ResourceApplicationList";
import NoteList from "../note/NoteList";

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
                        value: lang.details,
                        content: (
                            <div style={{width: '100%'}}>
                                <OperationForm {...props}/>
                            </div>
                        )
                    }, {
                        key: 1,
                        value: lang.actions,
                        content: <div style={{width: '100%'}}>
                            <ActionItemList operation={props.data}/>
                        </div>
                    },
                    {
                        key: 2,
                        value: lang.followUpGoal,
                        content: <div style={{width: '100%'}}>
                            <FollowUpList operation={props.data}/>
                        </div>
                    },
                    {
                        key: 3,
                        value: lang.executions,
                        content: <div style={{width: '100%'}}>
                            <ExecutionList operation={props.data}/>
                        </div>
                    },
                    {
                        key: 4,
                        value: lang.permanentGoods,
                        content: <div style={{width: '100%'}}>
                            <PermanentGoodsList operation={props.data}/>

                        </div>
                    },
                    {
                        key: 5,
                        value: lang.resourceApplication,
                        content: <div style={{width: '100%'}}>
                            <ResourceApplicationList operation={props.data}/>
                        </div>
                    },{
                        key: 6,
                        value: lang.note,
                        content: <div style={{width: '100%'}}>
                            <NoteList operation={props.data}/>
                        </div>
                    },
                ]}
                setOpenTab={setOpenTab}
                openTab={openTab}
            />
    )
}
Operation.propTypes = {
    workPlan: PropTypes.object,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    stage: PropTypes.object
}
