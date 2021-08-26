import {useRouter} from "next/router";
import React, {useState} from "react";
import Head from "next/head";
import Tabs from "../components/shared/misc/tabs/Tabs";
import OverviewPT from "../packages/locales/OverviewPT";
import InfrastructureList from "../components/entities/infrastructure/InfrastructureList";
import BudgetPlanList from "../components/entities/budget_plan/BudgetPlanList";
import NatureExpenseList from "../components/entities/nature_expense/NatureExpenseList";
import ActionList from "../components/entities/action/ActionList";
import ClassificationList from "../components/entities/classification/ClassificationList";
import DecentralizedUnitList from "../components/entities/decentralized/DecentralizedUnitList";
import UnitList from "../components/entities/unit/UnitList";



export default function entities(){
    const lang = OverviewPT
    const router = useRouter()
    const [openTab, setOpenTab] = useState(0)
    return (
        <>
            <Head>
                <title>Entidades</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <>
                <Tabs
                    buttons={[
                        {
                            key: 0,
                            value: lang.natureOfExpense,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <NatureExpenseList/>
                                </div>
                            )
                        },

                        {
                            key: 1,
                            value: lang.budgetPlans,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                <BudgetPlanList/>
                                </div>
                            )
                        },
                        {
                            key: 2,
                            value: lang.infrastructures,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                <InfrastructureList/>
                                </div>
                            )
                        },
                        {
                            key: 3,
                            value: lang.actions,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <ActionList />
                                </div>
                            )
                        },
                        {
                            key: 4,
                            value: lang.classifications,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <ClassificationList />
                                </div>
                            )
                        },
                        {
                            key: 5,
                            value: lang.decentralizedUnit,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <DecentralizedUnitList />
                                </div>
                            )
                        },
                        {
                            key: 6,
                            value: lang.unit,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <UnitList />
                                </div>
                            )
                        },
                    ]} type={'horizontal'}
                    setOpenTab={setOpenTab}
                    openTab={openTab}
                    styles={{width: '100%', paddingTop: '16px', justifyContent: 'center'}}
                />


            </>
        </>
    )
}