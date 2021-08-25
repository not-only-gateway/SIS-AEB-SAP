import PropTypes from 'prop-types'
import React, {useState} from "react";
import animations from "../../../../styles/Animations.module.css";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import List from "../../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../../utils/shared/Host";
import {RemoveRounded} from "@material-ui/icons";
import WorkPlanRequests from "../../../../utils/requests/WorkPlanRequests";
import FinancialDisbursementForm from "./FinancialDisbursementForm";

export default function FinancialDisbursementList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)

    return (
        <div style={{width: '100%'}}>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <FinancialDisbursementForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} workPlan={props.workPlan}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'financial_disb'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/financial_disbursement'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    options={[{
                        label: 'Deletar',
                        icon: <RemoveRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteFinancial({
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false
                    }]}
                    fields={[
                        {name: 'year', type: 'string',label: 'status'},
                        {name: 'month', type: 'string'},
                        {name: 'value', type: 'number', label: 'data da atualização', maskStart: 'R$ '},
                    ]} labels={['ano', 'mês', 'valor']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Desembolso financeiro'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    fetchParams={{
                        work_plan: props.workPlan.id
                    }}
                />
            </div>
        </div>
    )
}
FinancialDisbursementList.propTypes = {
    workPlan: PropTypes.object
}