import React, {useState} from "react";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import PropTypes from "prop-types";
import animations from "../../../styles/Animations.module.css";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import List from "../../shared/misc/list/List";
import WorkPlanForm from "./WorkPlanForm";
import WorkPlanRequests from "../../../utils/requests/WorkPlanRequests";
import {RemoveRounded} from "@material-ui/icons";

export default function WorkPlanList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <WorkPlanForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }} redirect={id => {
                        WorkPlanRequests.fetchWorkPlan(id).then(res => {
                            if (res !== null)
                                props.setCurrentStructure(res)
                        })}}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })} project={props.project}
                        create={true} ted={props.ted}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/work_plan'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    fields={[
                        {name: 'object', type: 'string'},
                        {name: 'budget_plan', type: 'object', subfield: 'number'},
                        {name: 'responsible', type: 'string'},
                    ]}
                    options={[{
                        label: 'Deletar',
                        icon: <RemoveRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteWorkPlan({
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            })
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
                    }} searchFieldName={'search_input'} title={'Planos de trabalho'} scrollableElement={'scrollableDiv'}
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