import Tabs from "../shared/misc/tabs/Tabs";
import ProjectList from "../index/ProjectList";
import TedList from "../index/TedList";
import WorkPlanList from "../index/WorkPlanList";
import React, {useState} from "react";
import OverviewPT from "../../packages/locales/OverviewPT";

export default function Ted() {
    const lang = OverviewPT

    const [openTab, setOpenTab] = useState(0)
    return (
        <Tabs
            type={'vertical'}
            buttons={[
                {
                    key: 0,
                    value: lang.teds,
                    content: (
                        null
                    )
                }, {
                    key: 1,
                    value: lang.addendum,
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