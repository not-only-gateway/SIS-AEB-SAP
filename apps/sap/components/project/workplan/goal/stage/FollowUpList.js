import React, {useState} from "react";
import handleObjectChange from "../../../../../utils/shared/HandleObjectChange";
import List from "../../../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../../../utils/shared/Host";
import {EditRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import animations from "../../../../../styles/Animations.module.css";
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

                    fields={[

                        {name: 'description', type: 'string',label: 'descrição'},
                        {name: 'accomplished', type: 'bool',label: 'Realizada'},
                    ]}
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