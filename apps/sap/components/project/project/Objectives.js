import PropTypes from "prop-types";
import React, {useState} from "react";
import animations from "../../../styles/Animations.module.css";
import List from "../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import ObjectiveForm from "./ObjectiveForm";
import {EditRounded} from "@material-ui/icons";

export default function Objectives(props){
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <div style={{width: '100%'}}>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <ObjectiveForm
                        returnToMain={() => {
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} project={props.project}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/goal_project'}
                    renderElement={element => {
                        return (

                            <div style={{display: 'flex', gap: '16px', justifyContent: 'space-between', width: '100%'}}>
                                <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                    <div>
                                        {element.description}
                                    </div>
                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                    <div style={{color: new Date(element.deadline).getTime() < (new Date()).getTime() ? '#ff5555' : undefined}}>
                                        {element.deadline}
                                    </div>
                                </div>
                                <EditRounded style={{fontSize: '1.3rem', color: '#555555'}}/>

                            </div>



                        )
                    }}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Marcos do projeto'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    fetchParams={{
                        project: props.project.id
                    }}
                />
            </div>
        </div>
    )
}
Objectives.propTypes={
    project: PropTypes.object
}