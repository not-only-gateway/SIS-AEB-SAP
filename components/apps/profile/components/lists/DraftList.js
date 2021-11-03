import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import Switcher from "../../../../core/navigation/switcher/Switcher";

import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";
import deleteEntry from "../../utils/shared/delete";
import getQuery from "../../utils/getQuery";
import Host from "../../utils/shared/Host";
import DynamicRoutes from "../../../../core/navigation/routing/DynamicRoutes";
import getForms from "../../../sap/getForms";


export default function DraftList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)

    const hook = useQuery(getQuery(Host() + '/list_draft'))

    return (
        <Switcher openChild={currentEntity !== null ? 0 : 1}
                  styles={{flexGrow: 1, maxHeight: '100%', padding: '0 10%'}}>
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
                title={'Rascunhos'}
            />
        </Switcher>
    )
}
