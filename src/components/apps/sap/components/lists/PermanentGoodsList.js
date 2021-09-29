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
                <>
                    <PermanentGoodsForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}

                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>
                </>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'permanent_goods'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/permanent_goods'}
                    

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deletePermanentGoods({
                                pk: entity.id,

                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }, {
                        label: 'Baixar dados',
                        icon: <GetAppRounded/>,
                        onClick: (entity) => {
                            HandleDownload(entity, entity.id)
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
                    }}  title={'Bens permanentes'}
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