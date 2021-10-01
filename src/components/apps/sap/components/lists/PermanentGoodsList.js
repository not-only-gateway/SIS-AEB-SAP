import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";

import Cookies from "universal-cookie/lib";

import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import OperationRequests from "../../utils/requests/OperationRequests";
import {List, useQuery} from "sis-aeb-core";
import Host from "../../utils/shared/Host";
import PermanentGoodsForm from "../forms/PermanentGoodsForm";


export default function PermanentGoodsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    const ref = useRef()
    return (
        <div style={{width: '100%'}}>

            {!open ? null :

                    <PermanentGoodsForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}

                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
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
                    fields={[
                        {key: 'description', type: 'string', label: 'Descrição'},
                        {key: 'total_value', type: 'number', maskStart: 'R$ ', label: 'valor total'},
                        {key: 'quantity', type: 'string', label: 'quantidade'},
                        {key: 'acquisition_date', type: 'date', label: 'Data de aquisição'},
                    ]}
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