import PropTypes from 'prop-types'
import React, {useState} from "react";

import Cookies from "universal-cookie/lib";

import {RemoveRounded} from "@material-ui/icons";
import Alert from "../../../shared/misc/alert/Alert";
import OperationRequests from "../../../../utils/fetch/OperationRequests";
import List from "../../../shared/misc/list/List";
import Host from "../../../../utils/shared/Host";
import PermanentGoodsForm from "../permanent/PermanentGoodsForm";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import ResourceApplicationForm from "./ResourceApplicationForm";


export default function ResourceApplicationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })
    return (
        <div style={{width: '100%'}}>
            <Alert
                type={status.type} render={status.type !== undefined}
                handleClose={() => setStatus({type: undefined, message: undefined})}
                message={status.message}
            />
            {!open ? null :
                <>
                    <ResourceApplicationForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>
                </>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'resource'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/resource_application'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    options={[{
                        label: 'Deletar',
                        icon: <RemoveRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteResource({
                                pk: entity.id,
                                setStatus: setStatus,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false
                    }]}
                    fields={[
                        {name: 'gnd', type: 'string'},
                        {name: 'nature_expense', type: 'string'},
                        {name: 'indirect_cost', type: 'bool'},
                        {name: 'value', type: 'number', maskStart: 'R$ '},
                    ]}

                    labels={['GND', 'Natureza de despesa', 'custo indireto', 'valor']}

                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Aplicação dos recursos'}
                    fetchSize={15}
                    fetchParams={{
                        operation: props.operation.id
                    }}
                />
            </div>
        </div>
    )
}
ResourceApplicationList.propTypes = {
    operation: PropTypes.object
}