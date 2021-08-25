import React, {useState} from "react";
import Cookies from "universal-cookie/lib";
import {RemoveRounded} from "@material-ui/icons";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import Host from "../../../utils/shared/Host";
import List from "../../shared/misc/list/List";
import ActionForm from "./ActionForm";

export default function ActionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)

    return (
        <>
            {!open ? null :
                <>
                    <ActionForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })} asDefault={true}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}/>
                </>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'budget'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/action'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    options={[{
                        label: 'Deletar',
                        icon: <RemoveRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteInfrastructure({
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false
                    }]}
                    fields={[
                        {name: 'number', type: 'string',label: 'Nome'},
                        {name: 'detailing', type: 'string',label: 'Tipo'}
                    ]} labels={['número', 'detalhamento']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Ações'}
                    fetchSize={15}

                />
            </div>
        </>
    )
}