import React, {useState} from "react";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import List from "../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import {EditRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import animations from "../../../styles/Animations.module.css";
import ExecutionForm from "./ExecutionForm";

export default function ExecutionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <ExecutionForm
                        returnToMain={() => {
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}
                    />
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'execution'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/execution'}

                    fields={[
                        {name: 'current_execution', type: 'string',label: 'Execução atual (%)'},
                        {name: 'committed', type: 'number',label: 'Valor empenhado', maskStart: 'R$ '},
                        {name: 'liquidated', type: 'number',label: 'Valor liquidado', maskStart: 'R$ '},
                        {name: 'paid', type: 'number',label: 'Valor pago', maskStart: 'R$ '},
                        {name: 'execution_date', type: 'date', label: 'Data da execução'}
                    ]}
                    clickEvent={() => null}
                    setEntity={entity => {
                        if(entity === null || entity === undefined)
                            setOpen(true)
                        else
                            props.setExecution(entity)
                    }} searchFieldName={'search_input'} title={'Execuções'}
                    scrollableElement={'scrollableDiv'} fetchSize={15}
                    fetchParams={{
                        operation: props.operation.id
                    }}
                />
            </div>
        </>
    )
}
ExecutionList.propTypes = {
    operation: PropTypes.object
}