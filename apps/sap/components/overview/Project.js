import Tabs from "../shared/misc/tabs/Tabs";
import React, {useState} from "react";
import OverviewPT from "../../packages/locales/OverviewPT";

export default function Project() {
    const lang = OverviewPT

    const [openTab, setOpenTab] = useState(0)
    return (
        <Tabs
            type={'vertical'}
            buttons={[
                {
                    key: 0,
                    value: lang.projects,
                    content: (
                        null
                    )
                }, {
                    key: 1,
                    value: lang.projectGoal,
                    content: (
                        null
                    )
                }, {
                    key: 2,
                    value: lang.risks,
                    content: (
                        null
                    )
                }
            ]}
            setOpenTab={setOpenTab}
            openTab={openTab}
        />
    )
}