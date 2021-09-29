import React, {useState} from "react";
import Head from "next/head";
import {Tabs} from "sis-aeb-core";
import OverviewPT from "../locales/OverviewPT";
import InfrastructureList from "../components/lists/InfrastructureList";
import BudgetPlanList from "../components/lists/BudgetPlanList";
import NatureExpenseList from "../components/lists/NatureExpenseList";
import ActionList from "../components/lists/ActionList";
import ClassificationList from "../components/lists/ClassificationList";
import DecentralizedUnitList from "../components/lists/DecentralizedUnitList";
import UnitList from "../components/lists/UnitList";
import TedList from "../components/lists/TedList";
import TypeList from "../components/lists/TypeList";


export default function EntitiesPage() {
    const lang = OverviewPT
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
                            value: lang.actions,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <ActionList/>
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
                            value: lang.teds,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <TedList/>
                                </div>
                            )
                        },
                        {
                            key: 3,
                            value: lang.infrastructures,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <InfrastructureList/>
                                </div>
                            )
                        },
                        {
                            key: 4,
                            value: lang.classifications,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <ClassificationList/>
                                </div>
                            )
                        },

                        {
                            key: 5,
                            value: lang.types,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <TypeList/>
                                </div>
                            )
                        },
                        {
                            key: 6,
                            value: lang.decentralizedUnit,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <DecentralizedUnitList/>
                                </div>
                            )
                        },

                        {
                            key: 7,
                            value: lang.unit,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <UnitList/>
                                </div>
                            )
                        },
                        {
                            key: 8,
                            value: lang.natureOfExpense,
                            content: (
                                <div style={{width: '70%', margin: 'auto'}}>
                                    <NatureExpenseList/>
                                </div>
                            )
                        },
                    ]}
                    type={'horizontal'}
                    setOpenTab={setOpenTab}
                    openTab={openTab}
                    styles={{width: '100%', paddingTop: '16px', justifyContent: 'center'}}
                />
            </>
        </>
    )
}