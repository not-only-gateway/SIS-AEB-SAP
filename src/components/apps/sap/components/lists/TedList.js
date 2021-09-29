import React, {useRef, useState} from "react";
import animations from "../../styles/Animations.module.css";
import {List, useQuery} from "sis-aeb-core";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import TedForm from "../forms/TedForm";
import TedRequests from "../../utils/requests/TedRequests";

export default function TedList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    const ref = useRef()
    return (
        <>

            {!open ? null :
                <div className={animations.fadeIn}>
                    <TedForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }} asEntity={true}
                         asDefault={true}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}
                    />
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'ted'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/ted'}
                    

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            TedRequests.deleteTed({
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
                    fields={[
                        {name: 'number', type: 'string', label: 'Número'},
                        {name: 'responsible', type: 'object', subfield: 'acronym'},
                        {name: 'process', type: 'string', label: 'Processo'}
                    ]}
                    labels={['Número', 'Responsável', 'Processo']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }}  title={'Instrumentos de celebração'}
                    fetchSize={15}
                />
            </div>
        </>
    )
}
