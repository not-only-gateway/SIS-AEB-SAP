import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";


import deleteEntry from "../../utils/delete";
import getQuery from "../../utils/getQuery";

import {DynamicRoutes, List, Switcher, useQuery} from 'mfc-core'
import getForms from "../../../sap/getForms";
import HOST_URL from "../../../../HOST_URL";


export default function DraftList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)

    const hook = useQuery(getQuery(HOST_URL + '/list_draft'))

    return (
        <Switcher openChild={currentEntity !== null ? 0 : 1}
                  styles={{height: '100%'}}>
            <DynamicRoutes
                routes={getForms()}
                componentProps={{
                    data: currentEntity?.data,
                    handleClose: () => setCurrentEntity(null),
                    create: true
                }}
                path={currentEntity?.endpoint.url}
                ready={true}
            />
            <List
                hook={hook}
                onRowClick={e => {
                    setCurrentEntity(e)
                }}
                keys={[
                    {
                        label: 'ID',
                        key: 'id',
                        type: 'number',
                        visible: true,
                    },
                    {
                        label: 'endpoint',
                        key: 'endpoint',
                        type: 'object',
                        visible: true,
                        subfieldKey: 'url',
                        subtype: 'string'
                    },
                    {
                        label: 'Formulário',
                        key: 'endpoint',
                        type: 'object',
                        visible: true,
                        subfieldKey: 'denomination',
                        subtype: 'string'
                    },
                    {
                        label: 'Descrição do formulário',
                        key: 'endpoint',
                        type: 'object',
                        visible: true,
                        subfieldKey: 'description',
                        subtype: 'string'
                    },
                ]}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'draft',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                title={'Rascunhos (ALPHA)'}
            />
        </Switcher>
    )
}
