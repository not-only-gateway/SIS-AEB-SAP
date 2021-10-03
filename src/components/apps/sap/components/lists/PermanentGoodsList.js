import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";

import {DeleteRounded} from "@material-ui/icons";
import OperationRequests from "../../utils/requests/OperationRequests";
import {List, useQuery} from "sis-aeb-core";
import PermanentGoodsForm from "../forms/PermanentGoodsForm";
import workPlanKeys from "../../keys/workPlanKeys";


export default function PermanentGoodsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    
    return (
        <div style={{width: '100%'}}>

            {!open ? null :

                    <PermanentGoodsForm
                        returnToMain={() => {
                            setOpen(false)
                            hook.clean()
                        }}

                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deletePermanentGoods({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    onRowClick={e => setCurrentEntity(e)}
                    hook={hook}
                    keys={workPlanKeys.permanentGoods}
                   title={'Bens permanentes'}

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