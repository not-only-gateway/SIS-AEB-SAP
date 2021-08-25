import React, {useState} from "react";
import animations from "../../../styles/Animations.module.css";
import List from "../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import {RemoveRounded} from "@material-ui/icons";
import Infrastructure from "./Infrastructure";
import WorkPlanRequests from "../../../utils/requests/WorkPlanRequests";

export default function InfrastructureList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)

    return (
        <>

            {!open ? null :
                <div className={animations.fadeIn}>
                    <Infrastructure
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                        asDefault={true}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}
                    />
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/infrastructure'}
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
                        {name: 'name', type: 'string',label: 'Nome'},
                        {name: 'type', type: 'string',label: 'Tipo'}
                    ]} labels={['Nome', 'Tipo']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Infraestruturas'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
          />
            </div>
        </>
    )
}
