import PropTypes from "prop-types";
import React, {useState} from "react";
import animations from "../../../styles/Animations.module.css";
import List from "../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import ObjectiveForm from "./ObjectiveForm";
import {EditRounded} from "@material-ui/icons";

export default function ObjectivesList(props){
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

                    fields={[
                        {name: 'description', type: 'string',label: 'descrição'},
                        {name: 'deadline', type: 'date', label: 'Prazo final'},
                        {name: 'status', type: 'string', label: 'status'}
                    ]}
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
ObjectivesList.propTypes={
    project: PropTypes.object
}