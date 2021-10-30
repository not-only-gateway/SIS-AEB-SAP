import PropTypes from 'prop-types'
import React, {useState} from "react";

import {DeleteRounded} from "@material-ui/icons";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";

import PermanentGoodsForm from "../forms/PermanentGoodsForm";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";


export default function PermanentGoodsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('permanent_goods', {operation_phase: props.operation?.id}))

    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%'}}>
            <div style={{paddingTop: '32px'}}>
                <PermanentGoodsForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }}

                    create={!currentEntity}
                    data={currentEntity} operation={props.operation}/>

            </div>
            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'permanent_goods',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
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