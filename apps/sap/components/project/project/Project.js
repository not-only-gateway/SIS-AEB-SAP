import ProjectForm from "../../index/ProjectForm";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import React, {useState} from "react";
import Tabs from "../../shared/misc/tabs/Tabs";
import ObjectivesList from "./ObjectivesList";
import RisksList from "./RisksList";
import ProjectPT from "../../../packages/locales/ProjectPT";
import PropTypes from 'prop-types'
import TedList from "./TedList";
import TedRequests from "../../../utils/fetch/TedRequests";

export default function Project(props) {
    const lang = ProjectPT
    const [openTab, setOpenTab] = useState(0)
    const [openInternalTab, setOpenInternalTab] = useState(0)
    return (

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
                                    value: lang.project,
                                    content: (
                                        <ProjectForm
                                            handleChange={event => handleObjectChange({
                                                event: event,
                                                setData: props.setProject
                                            })} id={props.project.id}
                                            create={false}
                                            data={props.project}
                                        />
                                    )
                                },
                                {
                                    key: 2,
                                    value: lang.objectives,
                                    content: <ObjectivesList project={props.project}/>
                                },
                                {
                                    key: 3,
                                    value: lang.risks,
                                    content: <RisksList project={props.project}/>
                                }
                            ]} type={'vertical'}

                            setOpenTab={setOpenInternalTab}
                            openTab={openInternalTab}
                        />
                    )
                },

                {
                    key: 1,
                    value: lang.teds,
                    content: <TedList
                        redirect={ted => {
                            TedRequests.fetchTed(typeof ted === 'object' ? ted.id : ted).then(res => {
                                console.log(ted)
                                if (res !== null)
                                    props.setCurrentStructure({
                                        ...props.currentStructure,
                                        ted: res
                                    })
                            })
                        }} project={props.project}/>
                }
            ]}
            setOpenTab={setOpenTab}
            openTab={openTab}
            styles={{paddingLeft: '10%', paddingRight: '10%'}}
        />
    )
}
Project.propTypes = {
    project: PropTypes.object,
    setProject: PropTypes.func,
    setCurrentStructure: PropTypes.func,
    currentStructure: PropTypes.object
}
