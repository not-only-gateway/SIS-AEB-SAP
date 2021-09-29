import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import Host from "../../utils/shared/Host";
import {List, useQuery} from "sis-aeb-core";
import ComponentForm from "../forms/ComponentForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";

export default function ComponentsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const ref = useRef()
    const hook = useQuery()
    return (
        <>

            {!open ? null :
                <ComponentForm
                    returnToMain={() => {
                        setOpen(false)
                        setRefreshed(false)
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} infrastructure={props.infrastructure}
                />

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/component'}

                    controlOptions={[

                        {
                            label: 'Importar',
                            icon: <PublishRounded/>,
                            onClick: (d) => {
                                ref.current.click()
                            },
                            disabled: false
                        },
                    ]}
                    fields={[
                        {name: 'classification', type: 'object',subfield: 'classification'},
                        {name: 'classification', type: 'object',subfield: 'type'},
                        {name: 'situation', type: 'string',label: 'situação'}
                    ]}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteComponent({
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
                    labels={['classificação', 'tipo', 'situação']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }}  title={'Situações Operacionais de Componentes'}
                    fetchParams={{
                        infrastructure: props.infrastructure.id
                    }}
                />
            </div>
        </>
    )
}
ComponentsList.propTypes = {
    infrastructure: PropTypes.object
}