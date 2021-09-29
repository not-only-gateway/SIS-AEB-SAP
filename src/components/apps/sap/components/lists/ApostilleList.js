import React, {useRef, useState} from "react";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import animations from "../../styles/Animations.module.css";

import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import WorkPlanForm from "../forms/WorkPlanForm";
import {apostille_query} from "../../queries/workplan";

export default function ApostilleList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(apostille_query)
    const ref = useRef()
    return (
        <div>

            {!open ? null :
                <div className={animations.fadeIn} style={{width: '100%'}}>
                    <WorkPlanForm
                        returnToMain={() => {
                            setRefreshed(false)
                            setOpen(false)
                        }}
                         asApostille={true} ted={props.ted}
                        create={currentEntity === undefined || currentEntity === null || currentEntity.id === undefined}
                        workPlan={props.workPlan.id}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined, width: '100%'}}>
                <List
                    listKey={'apostille'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/apostille'}

                    fields={[
                        {name: 'object', type: 'string'},
                        {name: 'budget_plan', type: 'object', subfield: 'number'},
                        {name: 'responsible', type: 'object', subfield: 'acronym'},
                    ]}
                    labels={['objeto', 'plano orçamentário', 'responsável']}
                    clickEvent={() => null}
                    setEntity={entity => {
                        setOpen(true)
                        if (entity === null || entity === undefined)
                            setCurrentEntity(props.workPlan)
                        else
                            setCurrentEntity(entity)
                    }}

                    
                    title={'Apostilamentos'}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteAppostile({
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }, {
                        label: 'Baixar dados',
                        icon: <GetAppRounded/>,
                        onClick: (entity) => {
                            HandleDownload(entity, entity.id)
                        },
                        disabled: false
                    }]}
                    fetchParams={{
                        work_plan: props.workPlan.id
                    }}
                    fetchSize={15}/>
            </div>
        </div>
    )


}
ApostilleList.propTypes ={
    workPlan: PropTypes.object
}