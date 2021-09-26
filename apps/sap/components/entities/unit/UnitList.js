import React, {useState} from "react";
import Cookies from "universal-cookie/lib";

import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import Host from "../../../utils/shared/Host";
import List from "../../shared/core/list/List";
import UnitForm from "./UnitForm";
import {DeleteRounded, GetAppRounded} from "@material-ui/icons";
import HandleDownload from "../../../utils/shared/HandleDownload";
import ProjectRequests from "../../../utils/requests/ProjectRequests";

export default function UnitList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)

    return (
        <>

            {!open ? null :
                <UnitForm
                    returnToMain={() => {
                        setOpen(false)
                        setRefreshed(false)
                    }}
                    handleChange={event => handleObjectChange({
                        event: event,
                        setData: setCurrentEntity
                    })} asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}
                />
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'unit'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/unit'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    fields={[
                        {name: 'name', type: 'string'},
                        {name: 'acronym', type: 'string'},
                        {name: 'parent_unit', type: 'object', subfield: 'acronym', fallback: 'Nenhuma'},
                    ]} labels={['nome', 'Acrônimo', 'Unidade pai']}
                    options={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteUnit({
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    },
                        {
                            label: 'Baixar dados',
                            icon: <GetAppRounded/>,
                            onClick: (entity) => {
                                HandleDownload(entity, entity.id)
                            },
                            disabled: false
                        }]}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Unidades / Responsáveis'}
                    fetchSize={15}
                />
            </div>
        </>
    )
}