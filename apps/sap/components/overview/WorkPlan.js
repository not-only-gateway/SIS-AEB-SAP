
import React, {useState} from "react";
import OverviewPT from "../../packages/locales/OverviewPT";
import Tabs from "../shared/misc/tabs/Tabs";

export default function WorkPlan() {
    const lang = OverviewPT

    const [openTab, setOpenTab] = useState(0)
    return (
        <Tabs
            buttons={[
                {
                    key: 0,
                    value: lang.workPlan,
                    content: (
                        null
                    )
                }, {
                    key: 1,
                    value: lang.action,
                    content: (
                        null
                    )
                }, {
                    key: 2,
                    value: lang.activity,
                    content: (
                        null
                    )
                }, {
                    key: 3,
                    value: lang.components,
                    content: (
                        null
                    )
                }, {
                    key: 4,
                    value: lang.infrastructure,
                    content: (
                        null
                    )
                }, {
                    key: 5,
                    value: lang.execution,
                    content: (
                        null
                    )
                }, {
                    key: 6,
                    value: lang.followupGoal,
                    content: (
                        null
                    )
                }, {
                    key: 7,
                    value: lang.goal,
                    content: (
                        null
                    )
                }, {
                    key: 8,
                    value: lang.status,
                    content: (
                        null
                    )
                }, {
                    key: 9,
                    value: lang.operation,
                    content: (
                        null
                    )
                }
            ]} type={'vertical'}
            setOpenTab={setOpenTab}
            openTab={openTab}
        />
    )
}