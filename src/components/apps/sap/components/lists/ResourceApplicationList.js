import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";

import Cookies from "universal-cookie/lib";

import {DeleteRounded, GetAppRounded} from "@material-ui/icons";
import OperationRequests from "../../utils/requests/OperationRequests";
import {List, useQuery} from "sis-aeb-core";
import Host from "../../utils/shared/Host";
import ResourceApplicationForm from "../forms/ResourceApplicationForm";


export default function ResourceApplicationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    const ref = useRef()

    return (
        <div style={{width: '100%'}}>

            {!open ? null :

                    <ResourceApplicationForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}

                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    onRowClick={e => setCurrentEntity(e)}
                    createOption={true}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteResource({
                                pk: entity.id,
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    fields={[
                        {name: 'nature_of_expense', type: 'object', subfield: 'gnd', label: 'GND'},
                        {name: 'nature_of_expense', type: 'object', subfield: 'nature_of_expense', label: 'Natureza de despesa'},
                        {name: 'indirect_cost', type: 'bool', label: 'custo indireto'},
                        {name: 'value', type: 'number', maskStart: 'R$ ',label: 'valor'},
                    ]}
                    title={'Aplicação dos recursos'}
                    fetchParams={{
                        operation: props.operation.id
                    }}
                />
            </div>
        </div>
    )
}
ResourceApplicationList.propTypes = {
    operation: PropTypes.object
}