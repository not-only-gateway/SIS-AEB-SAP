import PropTypes from 'prop-types'
import React, {useState} from "react";
import animations from "../../styles/Animations.module.css";
import ProjectForm from "../index/ProjectForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import List from "../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import {EditRounded} from "@material-ui/icons";
import GoalForm from "./GoalForm";

export default function GoalList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <GoalForm
                        returnToMain={() => {
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} workPlan={props.workPlan}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/risk'}
                    renderElement={element => {
                        return (
                            <div style={{display: 'flex', gap: '16px', justifyContent: 'space-between', width: '100%'}}>
                                <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                    <div>
                                        {element.description}
                                    </div>
                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                    <div>
                                        {element.analysis}
                                    </div>
                                </div>
                                <EditRounded style={{fontSize: '1.3rem', color: '#555555'}}/>

                            </div>
                        )
                    }}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Metas'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    fetchParams={{
                        work_plan: props.workPlan.id
                    }}
          />
            </div>
        </>
    )
}
GoalList.propTypes = {
    workPlan: PropTypes.object
}