import React from "react";
import Head from "next/head";
import OverviewPT from "../locales/OverviewPT";
import InfrastructureList from "../components/lists/InfrastructureList";
import BudgetPlanList from "../components/lists/BudgetPlanList";
import NatureExpenseList from "../components/lists/NatureExpenseList";
import ActionList from "../components/lists/ActionList";
import ClassificationList from "../components/lists/ClassificationList";
import DecentralizedUnitList from "../components/lists/DecentralizedUnitList";
import UnitList from "../components/lists/UnitList";
import TypeList from "../components/lists/TypeList";
import PropTypes from "prop-types";
import Tabs from "../../../core/misc/tabs/Tabs";
import styles from '../styles/Shared.module.css'

export default function Associative() {
    const lang = OverviewPT

    return (
        <>
            <Head>
                <title>Entidades</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <Tabs
                buttons={[
                    {
                        label: lang.actions,
                        children: (
                            <div className={styles.contentWrapper}>
                                <ActionList/>
                            </div>
                        )
                    },
                    {
                        label: lang.budgetPlans,
                        children: (
                            <div className={styles.contentWrapper}>
                                <BudgetPlanList/>
                            </div>
                        )
                    },
                    {
                        label: lang.infrastructures,
                        children: (
                            <div className={styles.contentWrapper}>
                                <InfrastructureList/>
                            </div>
                        )
                    },
                    {
                        label: lang.classifications,
                        children: (
                            <div className={styles.contentWrapper}>
                                <ClassificationList/>
                            </div>
                        )
                    },

                    {
                        label: lang.types,
                        children: (
                            <div className={styles.contentWrapper}>
                                <TypeList/>
                            </div>
                        )
                    },
                    {
                        label: lang.decentralizedUnit,
                        children: (
                            <div className={styles.contentWrapper}>
                                <DecentralizedUnitList/>
                            </div>
                        )
                    },

                    {
                        label: lang.unit,
                        children: (
                            <div className={styles.contentWrapper}>
                                <UnitList/>
                            </div>
                        )
                    },
                    {
                        label: lang.natureOfExpense,
                        children: (
                            <div className={styles.contentWrapper}>
                                <NatureExpenseList/>
                            </div>
                        )
                    },
                ]}
            />
        </>
    )
}
Associative.propTypes = {
    redirect: PropTypes.func
}