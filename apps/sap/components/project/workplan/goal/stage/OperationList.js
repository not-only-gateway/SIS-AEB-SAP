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
                        })} workPlan={props.workPlan}
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

                    fields={[

                        {name: 'phase', type: 'string',label: 'Fase'},
                        {name: 'version', type: 'string',label: 'versão'},
                        {name: 'detailing', type: 'string',label: 'Detalhamento'},
                    ]} labels={['Fase', 'versão', 'detalhamento']}
                    clickEvent={() => null}
                    setEntity={entity => {
                        setOpen(true)
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Fases / operações'}
                    scrollableElement={'scrollableDiv'} fetchSize={15}
                    fetchParams={props.stage !== null && props.stage !== undefined ? {
                        stage: props.stage.id
                    } : {
                        work_plan: props.workPlan.id
                    }}
                />
            </div>
        </>
    )
}
OperationList.propTypes = {
    stage: PropTypes.object,
    setExecution: PropTypes.func,
    workPlan: PropTypes.object
}