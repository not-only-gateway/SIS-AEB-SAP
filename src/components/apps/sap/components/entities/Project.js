import ProjectForm from "../forms/ProjectForm";
import React, {useState} from "react";
import {Tabs} from "sis-aeb-core";
import ProjectGoal from "../lists/ObjectivesList";
import RisksList from "../lists/RisksList";
import ProjectPT from "../../locales/ProjectPT";
import PropTypes from 'prop-types'
import ProjectTedsList from "../lists/ProjectTedsList";
import TedRequests from "../../utils/requests/TedRequests";

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
                                    content: <ProjectGoal project={props.project}/>
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
                    content: <ProjectTedsList
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
