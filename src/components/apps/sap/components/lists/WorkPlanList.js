import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import animations from "../../styles/Animations.module.css";

import {List, useQuery} from "sis-aeb-core";
import WorkPlanForm from "../forms/WorkPlanForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";

export default function WorkPlanList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    const ref = useRef()
    return (
        <>

            {!open ? null :
                <div className={animations.fadeIn}>
                    <WorkPlanForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }} redirect={id => {
                        WorkPlanRequests.fetchWorkPlan(id.id).then(res => {
                            if (res !== null)
                                props.setCurrentStructure(res)
                        })
                    }}
                         project={props.project}
                        create={true} ted={props.ted}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/work_plan'}
                    
                    fields={[
                        {name: 'object', type: 'string'},
                        {name: 'budget_plan', type: 'object', subfield: 'number'},
                        {name: 'responsible', type: 'object', subfield: 'acronym'},
                    ]}

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteWorkPlan({
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
                    labels={['objeto', 'plano orçamentário', 'responsável']}
                    clickEvent={() => null}
                    setEntity={entity => {
                        if (entity === null || entity === undefined) {
                            setOpen(true)
                        } else
                            props.setCurrentStructure(entity)
                    }}  title={'Planos de trabalho'} 
                    fetchSize={15}
                    fetchParams={{
                        ted: props.ted.id,
                        project: props.project.id
                    }}
                />
            </div>
        </>
    )
}
WorkPlanList.propTypes = {
    setCurrentStructure: PropTypes.func,
    ted: PropTypes.object,
    project: PropTypes.object

}