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
    const [refreshed, setRefreshed] = useState(false)
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })
    return (
        <div style={{width: '100%'}}>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <ObjectiveForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
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
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    fields={[
                        {name: 'description', type: 'string'},
                        {name: 'deadline', type: 'date'},
                        {name: 'status', type: 'string'}
                    ]}
                    labels={['descrição','prazo final', 'status']}
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