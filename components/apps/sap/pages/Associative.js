import React from "react";
import Head from "next/head";
import OverviewPT from "../locales/OverviewPT";
import InfrastructureList from "../components/lists/InfrastructureList";
import BudgetPlanList from "../components/lists/BudgetPlanList";
import NatureExpenseList from "../components/lists/NatureExpenseList";
import ActionList from "../components/lists/ActionList";
import ComponentClassificationList from "../components/lists/ComponentClassificationList";
import DecentralizedUnitList from "../components/lists/DecentralizedUnitList";
import UnitList from "../components/lists/UnitList";
import TypeList from "../components/lists/TypeList";
import PropTypes from "prop-types";
import Tabs from "../../../core/navigation/tabs/Tabs";
import styles from '../styles/Shared.module.css'
import Tab from "../../../core/navigation/tabs/Tab";
import shared from '../styles/Shared.module.css'

export default function Associative(props) {
    const lang = OverviewPT

    return (
        <>
            <Head>
                <title>Entidades</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <Tabs
                className={shared.wrapper}
            >
                <Tab label={lang.actions} className={shared.tabWrapper}>
                    <ActionList/>
                </Tab>
                <Tab label={lang.budgetPlans} className={shared.tabWrapper}>
                    <BudgetPlanList/>
                </Tab>

                <Tab label={lang.infrastructures} className={shared.tabWrapper}>
                    <InfrastructureList redirect={props.redirect}/>
                </Tab>
                <Tab label={lang.classifications} className={shared.tabWrapper}>
                    <ComponentClassificationList/>
                </Tab>
                <Tab label={lang.types} className={shared.tabWrapper}>
                    <TypeList/>
                </Tab>

                <Tab label={lang.decentralizedUnit} className={shared.tabWrapper}>
                    <DecentralizedUnitList/>
                </Tab>

                <Tab label={'Unidades da AEB'} className={shared.tabWrapper}>
                    <UnitList/>
                </Tab>

                <Tab label={lang.natureOfExpense} className={shared.tabWrapper}>
                    <NatureExpenseList/>
                </Tab>


            </Tabs>
        </>
    )
}
Associative.propTypes = {
    redirect: PropTypes.func
}