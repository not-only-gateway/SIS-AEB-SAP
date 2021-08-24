import PropTypes from 'prop-types'
import React, {useState} from "react";

import Cookies from "universal-cookie/lib";

import {RemoveRounded} from "@material-ui/icons";
import Alert from "../../../shared/misc/alert/Alert";
import OperationRequests from "../../../../utils/fetch/OperationRequests";
import List from "../../../shared/misc/list/List";
import Host from "../../../../utils/shared/Host";
import PermanentGoodsForm from "./PermanentGoodsForm";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";


export default function PermanentGoodsList(props) {
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
                    <PermanentGoodsForm
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
                    listKey={'permanent_goods'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/permanent_goods'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    options={[{
                        label: 'Deletar',
                        icon: <RemoveRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deletePermanentGoods({
                                pk: entity.id,
                                setStatus: setStatus,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false
                    }]}
                    fields={[
                        {name: 'description', type: 'string'},
                        {name: 'total_value', type: 'number', maskStart: 'R$ '},
                        {name: 'quantity', type: 'string'},
                        {name: 'acquisition_date', type: 'date'},
                    ]} labels={['Descrição', 'valor total', 'quantidade', 'Data de aquisição']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Bens permanentes'}
                    fetchSize={15}
                    fetchParams={{
                        operation: props.operation.id
                    }}
                />
            </div>
        </div>
    )
}
PermanentGoodsList.propTypes = {
    operation: PropTypes.object
}