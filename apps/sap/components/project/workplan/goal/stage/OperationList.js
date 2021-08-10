import React, {useState} from "react";
import handleObjectChange from "../../../../../utils/shared/HandleObjectChange";
import List from "../../../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../../../utils/shared/Host";
import {EditRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import animations from "../../../../../styles/Animations.module.css";
import Operation from "./Operation";

export default function OperationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <Operation
                        returnToMain={() => {
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} stage={props.stage}
                        setExecution={props.setExecution}
                    />
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'operation_phase'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/operation_phase'}
                    renderElement={element => {
                        return (
                            <div style={{display: 'flex', gap: '16px', justifyContent: 'space-between', width: '100%'}}>
                                <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                    <div>
                                        {element.phase}
                                    </div>
                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                    <div>
                                        {element.version}
                                    </div>
                                </div>
                                <EditRounded style={{fontSize: '1.3rem', color: '#555555'}}/>
                            </div>
                        )
                    }}
                    clickEvent={() => null}
                    setEntity={entity => {
                        setOpen(true)
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Fases / operações'}
                    scrollableElement={'scrollableDiv'} fetchSize={15}
                    fetchParams={{
                        stage: props.stage.id
                    }}
                />
            </div>
        </>
    )
}
OperationList.propTypes = {
    stage: PropTypes.object,
    setExecution: PropTypes.func
}