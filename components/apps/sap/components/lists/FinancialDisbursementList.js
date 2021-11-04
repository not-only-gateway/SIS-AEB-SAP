import PropTypes from 'prop-types'
import React, {useState} from "react";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";

import {DeleteRounded} from "@material-ui/icons";
import FinancialDisbursementForm from "../forms/FinancialDisbursementForm";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";


export default function FinancialDisbursementList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('financial', {
        work_plan: props.workPlan.id
    }))


    return (

        <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>
                 <FinancialDisbursementForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} workPlan={props.workPlan}/>

            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'financial_disbursement',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                hook={hook}
                keys={associativeKeys.financialDisbursement}
                title={'Desembolso financeiro'}


            />
        </Switcher>
    )
}
FinancialDisbursementList.propTypes =
    {
        workPlan: PropTypes.object
    }