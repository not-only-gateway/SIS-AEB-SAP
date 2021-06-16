import HomePT from "../packages/locales/HomePT";
import Tabs from '../components/shared/Tabs'
import HeaderLayout from "../components/shared/HeaderLayout";
import TabContent from "../components/shared/TabContent";
import {useState} from "react";
import Status from "../components/home/Status";
import Overview from "../components/home/Overview";
import Usage from "../components/home/Usage";

export default function Home() {
    const lang = HomePT
    const [openTab, setOpenTab] = useState(0)

    function getTitle(){
        let value = null
        switch (openTab) {
            case 0: {
                value = lang.overview
                break
            }
            case 1: {
                value = lang.status
                break
            }
            case 2: {
                value = lang.usage
                break
            }
            default:
                break
        }
        return value
    }
    return (
        <div style={{display: 'flex'}}>

            <Tabs
                buttons={[
                    {
                        key: 0,
                        value: lang.overview
                    },
                    {
                        key: 1,
                        value: lang.status
                    },
                    {
                        key: 2,
                        value: lang.usage
                    },

                ]}
                setOpenTab={setOpenTab}
                openTab={openTab}
            />

            <div style={{width: 'calc(100% - 220px)', marginLeft: 'auto', overflowY: 'hidden'}}>
                <HeaderLayout
                    width={'95%'}
                    title={
                        lang.title
                    }
                    information={getTitle()}
                    pageTitle={
                        getTitle()
                    }
                />
                <TabContent
                    openTab={openTab}

                    tabs={[
                        {
                            buttonKey: 0,
                            value: <Overview/>
                        },
                        {
                            buttonKey: 1,
                            value: <Status/>

                        },
                        {
                            buttonKey: 2,
                            value: <Usage/>
                        },
                    ]}
                />
            </div>
        </div>

    )
}
