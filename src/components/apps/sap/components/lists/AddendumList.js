import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import animations from "../../styles/Animations.module.css";

import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import TedRequests from "../../utils/requests/TedRequests";
import TedForm from "../forms/TedForm";
import {List, useQuery} from "sis-aeb-core";
import {addendum_query} from "../../queries/ted";

export default function AddendumList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(addendum_query)
    const ref = useRef()

    return (
        <div style={{width: '100%'}}>

            {!open ? null :

                    <TedForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }} asAddendum={true}
                         ted={props.ted}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List

                    createOption={true}

                    fields={[
                        {key: 'number', type: 'string', label: 'Número'},
                        {key: 'responsible', type: 'object', subfieldKey: 'acronym', label: 'Responsável'},
                        {key: 'process', type: 'string', label: 'Processo'}
                    ]}

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            TedRequests.deleteAddendum({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]} title={'Termos aditivos'}
                    fetchParams={{
                        ted: props.ted.id
                    }}
                />
            </div>
        </div>
    )
}
AddendumList.propTypes = {
    ted: PropTypes.object
}