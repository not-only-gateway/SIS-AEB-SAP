import PropTypes from 'prop-types'
import React, {useState} from "react";
import Cookies from "universal-cookie/lib";
import {EditRounded} from "@material-ui/icons";
import Host from "../../../../utils/shared/Host";
import List from "../../../shared/misc/list/List";
import ComponentForm from "./ComponentForm";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";

export default function ComponentsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })
    const [refreshed, setRefreshed] = useState(false)
    return (
        <>
            {!open ? null :
                <ComponentForm
                    returnToMain={() => {
                        setOpen(false)
                        setRefreshed(false)
                    }}
                    handleChange={event => handleObjectChange({
                        event: event,
                        setData: setCurrentEntity
                    })}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} infrastructure={props.infrastructure}
                />

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/component'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}

                    fields={[
                        {name: 'classification', type: 'string',label: 'classificação'},
                        {name: 'type', type: 'string',label: 'Tipo'},
                        {name: 'situation', type: 'string',label: 'situação'}
                    ]}
                    labels={['classificação', 'tipo', 'situação']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Componentes'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
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