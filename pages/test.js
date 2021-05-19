import React, {useState} from 'react'
import {useRouter} from "next/router";
import ExpandableTabs from "../components/layout/navigation/ExpandableTabs";


export default function test() {

    const router = useRouter()
    const [openTab, setOpenTab] = useState({
        mainTab: 0,
        subTab: 0
    })
    return (
        <div style={{width: '75%', margin: 'auto'}}>
            <ExpandableTabs
                buttons={[
                    {
                        mainButton: {
                            key: 0,
                            value: 'cafe'
                        },
                        subButtons: [
                            {
                                key: 0,
                                value: 'sub cafe'
                            },
                            {
                                key: 1,
                                value: 'sub cafe 2'
                            },
                        ]
                    },
                    {
                        mainButton: {
                            key: 1,
                            value: 'cafe 2'
                        },
                        subButtons: [
                            {
                                key: 0,
                                value: 'sub cafe'
                            },
                            {
                                key: 1,
                                value: 'sub cafe 2'
                            },
                        ]
                    }
                ]}
                openTab={openTab}
                setOpenTab={setOpenTab}
            />
        </div>
    )
}
