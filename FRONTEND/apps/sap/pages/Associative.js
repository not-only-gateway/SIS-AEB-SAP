import React, {useEffect, useState} from "react";
import Head from "next/head";
import OverviewPT from "../locales/OverviewPT";
import InfrastructureList from "../components/lists/InfrastructureList";
import BudgetPlanList from "../components/lists/BudgetPlanList";
import NatureExpenseList from "../components/lists/NatureExpenseList";
import ActionList from "../components/lists/ActionList";
import DecentralizedUnitList from "../components/lists/DecentralizedUnitList";
import UnitList from "../components/lists/UnitList";
import TypeList from "../components/lists/TypeList";
import PropTypes from "prop-types";
import shared from '../styles/Shared.module.css'


import {Tab, Tabs} from 'mfc-core'

export default function Associative(props) {
    const lang = OverviewPT
    const [open, setOpen] = useState(0)

    useEffect(() => {
        const t = props.query.tab
        setOpen(t !== undefined && !isNaN(parseInt(t)) ? parseInt(t) : 0)
    }, [props.query])

    return (
        <>
            <Head>
                <title>Entidades</title>
                <link rel='icon' href={'/light-small.png'} type='image/x-icon'/>
            </Head>
            <Tabs
                open={open}
                setOpen={index => {
                    const url = {pathname: props.pathname, query: {...props.query, tab: index}}
                    props.redirect(url, url, {shallow: false})
                }}
                className={shared.wrapper}
            >
                <Tab label={lang.actions} className={shared.tabWrapper} styles={{padding: 0}}>
                    <ActionList/>
                </Tab>
                <Tab label={lang.budgetPlans} className={shared.tabWrapper} styles={{padding: 0}}>
                    <BudgetPlanList/>
                </Tab>

                <Tab label={lang.infrastructures} className={shared.tabWrapper} styles={{padding: 0}}>
                    <InfrastructureList redirect={props.redirect}/>
                </Tab>
                <Tab label={lang.types} className={shared.tabWrapper} styles={{padding: 0}}>
                    <TypeList/>
                </Tab>

                <Tab label={lang.decentralizedUnit} className={shared.tabWrapper} styles={{padding: 0}}>
                    <DecentralizedUnitList/>
                </Tab>

                <Tab label={'Unidades da AEB'} className={shared.tabWrapper} styles={{padding: 0}}>
                    <UnitList/>
                </Tab>

                <Tab label={lang.natureOfExpense} className={shared.tabWrapper} styles={{padding: 0}}>
                    <NatureExpenseList/>
                </Tab>


            </Tabs>
        </>
    )
}
Associative.propTypes = {
    pathname: PropTypes.string,
    redirect: PropTypes.func,
    query: PropTypes.object
}