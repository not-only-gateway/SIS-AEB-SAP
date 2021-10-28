import React, {useContext, useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import Switcher from "../../../../core/navigation/switcher/Switcher";

import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";
import deleteEntry from "../../utils/shared/delete";
import getQuery from "../../utils/getQuery";
import ProfileContext from "../../ProfileContext";
import Host from "../../utils/shared/Host";
import DynamicRoutes from "../../../../core/navigation/routing/DynamicRoutes";
import getForms from "../../../sap/getForms";


export default function DraftList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)

    const hook = useQuery(getQuery(Host() + '/list_draft'))

    return (
        <Switcher openChild={currentEntity !== null ? 0 : 1}>
            <div style={{paddingTop: '32px'}}>
                <DynamicRoutes
                    routes={getForms()}
                    componentProps={{
                        data: currentEntity?.data,
                        handleClose: () => setCurrentEntity(null),
                        create: true
                    }}
                    path={currentEntity?.endpoint}
                    ready={true}
                />
            </div>
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
                        type: 'string',
                        visible: true,
                    },
                    {
                        label: 'Formulário',
                        key: 'entity',
                        type: 'object',
                        visible: true,
                        subfieldKey: 'denomination',
                        subtype: 'string'
                    },
                    {
                        label: 'Descrição do formulário',
                        key: 'entity',
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
