import PropTypes from 'prop-types'
import React, {useState} from "react";
import Cookies from "universal-cookie/lib";
import {EditRounded} from "@material-ui/icons";
import Host from "../../../../../utils/shared/Host";
import List from "../../../../shared/misc/list/List";
import handleObjectChange from "../../../../../utils/shared/HandleObjectChange";
import StageForm from "./StageForm";
import WorkPlanRequests from "../../../../../utils/fetch/WorkPlanRequests";


export default function StageList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {open ?
                <StageForm
                    returnToMain={() => {
                        setOpen(false)
                        setCurrentEntity(null)
                    }}
                    open={open}
                    handleChange={event => handleObjectChange({
                        event: event,
                        setData: setCurrentEntity
                    })}
                    redirect={id => {
                        WorkPlanRequests.fetchStage(id).then(res => {
                            console.log(res)
                            if (res !== null)
                                props.setCurrentStructure(res)
                        })
                    }}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} goal={props.goal}
                />
                :
                null
            }

            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/activity'}

                    fields={[
                        {name: 'stage', type: 'string', label: 'etapa'},
                        {name: 'description', type: 'string', label: 'descrição'},
                    ]}
                    clickEvent={() => null}
                    setEntity={entity => {
                        console.log(entity)
                        if (entity !== null && entity !== undefined)
                            props.setCurrentStructure(entity)
                        else
                            setOpen(true)
                    }} searchFieldName={'search_input'} title={'Etapas'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    fetchParams={{
                        goal: props.goal.id
                    }}
                />
            </div>
        </>
    )
}
StageList.propTypes = {
    goal: PropTypes.object,
    setCurrentStructure: PropTypes.func
}