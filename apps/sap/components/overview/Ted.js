import Tabs from "../shared/core/tabs/Tabs";
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