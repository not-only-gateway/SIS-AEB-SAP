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
        <>
            {!open ? null :
                <WorkPlanForm
                    returnToMain={() => {
                        setRefreshed(false)
                        setOpen(false)
                    }}
                    asApostille={true} ted={props.ted}
                    create={currentEntity === undefined || currentEntity === null || currentEntity.id === undefined}
                    workPlan={props.workPlan.id}
                    data={currentEntity}/>
            }
            <div style={{display: open ? 'none' : undefined, width: '100%'}}>
                <List
                    createOption={true}
                    fields={[
                        {key: 'object', type: 'string', label: 'Objeto'},
                        {key: 'budget_plan', type: 'object', subfield: 'number', label: 'Plano orçamentário'},
                        {key: 'responsible', type: 'object', subfield: 'acronym', label: 'Responsável'},
                    ]}
                    onCreate={() => setCurrentEntity(props.workPlan)}
                    onRowClick={entity => {
                        setCurrentEntity(entity)
                    }}


                    title={'Apostilamentos'}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteAppostile({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    fetchParams={{
                        work_plan: props.workPlan.id
                    }}/>
            </div>
        </>
    )


}
ApostilleList.propTypes = {
    workPlan: PropTypes.object
}