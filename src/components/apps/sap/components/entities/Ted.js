import React, {useState} from "react";
import {Tabs} from "sis-aeb-core";
import PropTypes from 'prop-types'
import TedPT from "../../locales/TedPT";
import TedForm from "../forms/TedForm";
import AddendumList from "../lists/AddendumList";
import WorkPlanList from "../lists/WorkPlanList";

export default function Ted(props) {
    const lang = TedPT
    const [openTab, setOpenTab] = useState(0)
    const [openInternalTab, setOpenInternalTab] = useState(0)
    return (
        <div>
            <Tabs
                buttons={[
                    {
                        key: 0,
                        value: lang.details,
                        content: (
                            <Tabs
                                buttons={[
                                    {
                                        key: 0,
                                        value: lang.ted,
                                        content: (
                                            <TedForm
                                                handleChange={props.setTed} id={props.ted.id}
                                                create={false}
                                                data={props.ted}
                                            />
                                        )
                                    },

                                    {
                                        key: 1,
                                        value: lang.addendum,
                                        content: <AddendumList ted={props.ted}/>
                                    }
                                ]} type={'vertical'}
                                setOpenTab={setOpenInternalTab}
                                openTab={openInternalTab} toolTipMountingElement={document.getElementById('root')}
                            />
                        )
                    },
                    {
                        key: 1,
                        value: lang.workPlan,
                        content: (
                            <WorkPlanList
                                redirect={() => null} ted={props.ted} project={props.project}
                                setCurrentStructure={props.setWorkPlan}
                            />

                        )
                    }
                ]}
                setOpenTab={setOpenTab}
                openTab={openTab}
                styles={{paddingLeft: '10%', paddingRight: '10%'}}
            />


        </div>
    )
}
Ted.propTypes = {
    ted: PropTypes.object,
    setTed: PropTypes.func,
    setWorkPlan: PropTypes.func,
    project: PropTypes.object
}
