import ProjectForm from "../index/ProjectForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import React, {useState} from "react";
import Tabs from "../shared/misc/tabs/Tabs";
import Objectives from "./Objectives";
import Risks from "./Risks";
import ProjectPT from "../../packages/locales/ProjectPT";
import PropTypes from 'prop-types'
export default function Project(props){
    const lang = ProjectPT
    const [openTab, setOpenTab] = useState(0)
    return(
        <div>

            <Tabs
                buttons={[
                    {
                        key: 0,
                        value: lang.project,
                        content: (
                            <ProjectForm
                                returnToMain={() => {
                                    null
                                }}
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
                        content: <Objectives project={props.project}/>
                    },
                    {
                        key: 3,
                        value: lang.risks,
                        content: <Risks project={props.project}/>
                    }
                ]} type={'vertical'}
                setOpenTab={setOpenTab}
                openTab={openTab}
            />

        </div>
    )
}
Project.propTypes={
    project: PropTypes.object,
    setProject: PropTypes.func
}
