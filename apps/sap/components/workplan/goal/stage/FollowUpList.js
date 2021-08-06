import React, {useState} from "react";
import Stage from "./Stage";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import List from "../../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../../utils/shared/Host";
import {EditRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import animations from "../../../../styles/Animations.module.css";
import Goal from "../Goal";
import Operation from "./Operation";
import FollowUpForm from "./FollowUpForm";

export default function FollowUpList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <FollowUpForm
                        returnToMain={() => {
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'follow_up_goal'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/follow_up_goal'}
                    renderElement={element => {
                        return (
                            <div style={{display: 'flex', gap: '16px', justifyContent: 'space-between', width: '100%'}}>
                                <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                    <div>
                                        {element.description}
                                    </div>
                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                    <div>
                                        {element.accomplished ? 'Realizada' : 'Não realizada'}
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
                    }} searchFieldName={'search_input'} title={'Marcos do acompanhamento'}
                    scrollableElement={'scrollableDiv'} fetchSize={15}
                    fetchParams={{
                        operation: props.operation.id
                    }}
                />
            </div>
        </>
    )
}
FollowUpList.propTypes = {
    operation: PropTypes.object
}