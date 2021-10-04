import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";

import {DeleteRounded} from "@material-ui/icons";
import OperationRequests from "../../utils/requests/OperationRequests";
import {List, useQuery} from "sis-aeb-core";
import PermanentGoodsForm from "../forms/PermanentGoodsForm";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import {permanent_goods_query} from "../../queries/workplan";


export default function PermanentGoodsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(permanent_goods_query({
        operation: props.operation.id
    }))
    
    return (
        <Switcher openChild={open ? 0 : 1}>

                    <PermanentGoodsForm
                        returnToMain={() => {
                            setOpen(false)
                            hook.clean()
                        }}

                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>
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

                    
                />
        </Switcher>
    )
}
PermanentGoodsList.propTypes = {
    operation: PropTypes.object
}