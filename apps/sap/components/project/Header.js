import PropTypes from 'prop-types'
import styles from "../../styles/Project.module.css";
import pStyles from "../../styles/Project.module.css";
import Link from "next/link";
import {ArrowBackIos, CategoryRounded} from "@material-ui/icons";
import React from "react";
import ProjectPT from "../../packages/locales/ProjectPT";
import ToolTip from "../shared/core/tooltip/ToolTip";

export default function Header(props) {
    const lang = ProjectPT
    const getTitle = () => {
        let res
        switch (true) {
            case props.currentStructure.ted === null : {
                res = (
                    <>
                        {props.project.name}
                        <div className={styles.subTitleContainer}>
                            <CategoryRounded style={{fontSize: '1.1rem'}}/>
                            Projeto
                        </div>
                    </>
                )
                break
            }
            case props.currentStructure.ted !== null && !props.currentStructure.workPlan : {
                res = (
                    <>
                        {props.currentStructure.ted.number}
                        <div className={styles.subTitleContainer}>
                            <CategoryRounded style={{fontSize: '1.1rem'}}/>
                            Instrumento de celebração
                        </div>
                    </>
                )
                break
            }
            case props.currentStructure.workPlan && !props.currentStructure.goal : {
                res = (
                    <>
                        {props.currentStructure.workPlan.object}
                        <div className={styles.subTitleContainer}>
                            <CategoryRounded style={{fontSize: '1.1rem'}}/>
                            Plano de trabalho
                        </div>
                    </>
                )
                break
            }
            case props.currentStructure.goal && !props.currentStructure.stage : {
                res = (
                    <>
                        {props.currentStructure.goal.goal_number}
                        <div className={styles.subTitleContainer}>
                            <CategoryRounded style={{fontSize: '1.1rem'}}/>
                            Meta do plano de trabalho
                        </div>
                    </>
                )
                break
            }
            case props.currentStructure.stage !== undefined : {
                res = (
                    <>
                        {props.currentStructure.stage.stage}
                        <div className={styles.subTitleContainer}>
                            <CategoryRounded style={{fontSize: '1.1rem'}}/>
                            Etapa / atividade
                        </div>
                    </>
                )
                break
            }
            default:
                break
        }
        return res
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {/*<Link href={'/'}>*/}
                {/*    <button className={[templates.homeButton, templates.headerButton].join(' ')}*/}
                {/*            style={{border: 'none'}}>*/}
                {/*        <HomeRounded/>*/}
                {/*    </button>*/}
                {/*</Link>*/}
                <div className={styles.header} style={{padding: '0', gap: '12px', justifyContent: 'flex-start'}}>
                    <Link href={'/'}>
                        <button className={styles.headerButton}>
                            {lang.projects}
                        </button>
                    </Link>
                    <ArrowBackIos style={{
                        fontSize: '.9rem',
                        color: '#666666',
                        transform: 'rotate(180deg) translateX(.35rem)'
                    }}/>
                    <button className={pStyles.headerButton} disabled={props.currentStructure.ted === null}
                            style={{maxWidth: '20%'}} id={'project-header'}
                            onClick={() => {
                                props.setCurrentStructure({
                                    ted: null
                                })
                            }}>
                        {props.project.name}
                        <ToolTip content={'Projeto'}/>
                    </button>

                    <span
                        style={{
                            display: props.currentStructure.ted !== undefined && props.currentStructure.ted !== null ? 'flex' : 'none',
                            alignItems: 'center', maxWidth: '20%'
                        }}>
                    <ArrowBackIos style={{
                        fontSize: '.9rem',
                        color: '#666666',
                        transform: 'rotate(180deg) translateX(.35rem)'
                    }}/>
                    <button
                        className={pStyles.headerButton} style={{maxWidth: '100%'}} id={'ted-header'}
                        onClick={() => {
                            props.setCurrentStructure({
                                ted: props.currentStructure.ted
                            })
                        }}
                        disabled={props.currentStructure.workPlan === undefined || props.currentStructure.workPlan === null}>
                        {props.currentStructure.ted !== undefined && props.currentStructure.ted !== null ? props.currentStructure.ted.number : null}
                    </button>
                    <ToolTip content={'Instrumento de celebração'}/>
                </span>

                    <span
                        style={{
                            display: props.currentStructure.workPlan !== undefined && props.currentStructure.workPlan !== null ? 'flex' : 'none',
                            alignItems: 'center', maxWidth: '20%'
                        }}>
                    <ArrowBackIos style={{
                        fontSize: '.9rem',
                        color: '#666666',
                        transform: 'rotate(180deg) translateX(.35rem)'
                    }}/>
                    <button className={pStyles.headerButton} id={'workPlan-header'}
                            onClick={() => {
                                props.setCurrentStructure({
                                    ted: props.currentStructure.ted,
                                    workPlan: props.currentStructure.workPlan
                                })
                            }}
                            disabled={props.currentStructure.goal === undefined || props.currentStructure.goal === null}>
                        {props.currentStructure.workPlan !== undefined && props.currentStructure.workPlan !== null ? props.currentStructure.workPlan.object : null}
                    </button>
                    <ToolTip content={'Plano de trabalho'}/>
                </span>

                    <span
                        style={{
                            display: props.currentStructure.goal !== undefined && props.currentStructure.goal !== null ? 'flex' : 'none',
                            alignItems: 'center', maxWidth: '20%'
                        }}>
                    <ArrowBackIos style={{
                        fontSize: '.9rem',
                        color: '#666666',
                        transform: 'rotate(180deg) translateX(.35rem)'
                    }}/>
                    <button className={pStyles.headerButton} id={'goal-header'}
                            onClick={() => {
                                props.setCurrentStructure({
                                    ted: props.currentStructure.ted,
                                    workPlan: props.currentStructure.workPlan,
                                    goal: props.currentStructure.goal
                                })
                            }}
                            disabled={props.currentStructure.stage === undefined || props.currentStructure.stage === null}>
                        {props.currentStructure.goal !== undefined && props.currentStructure.goal !== null ? props.currentStructure.goal.goal_number : null}
                    </button>
                    <ToolTip content={'Meta'}/>
                </span>

                    <div
                        style={{
                            display: props.currentStructure.stage !== undefined && props.currentStructure.stage !== null ? 'flex' : 'none',
                            alignItems: 'center', maxWidth: '20%'
                        }}>
                        <ArrowBackIos style={{
                            fontSize: '.9rem',
                            color: '#666666',
                            transform: 'rotate(180deg) translateX(.35rem)'
                        }}/>
                        <button className={pStyles.headerButton} id={'stage-header'}
                                onClick={() => {
                                    props.setCurrentStructure({
                                        ted: props.currentStructure.ted,
                                        workPlan: props.currentStructure.workPlan,
                                        goal: props.currentStructure.goal,
                                        stage: props.currentStructure.stage
                                    })
                                }}
                                disabled={props.currentStructure.execution === undefined || props.currentStructure.execution === null}>
                            {props.currentStructure.stage !== undefined && props.currentStructure.stage !== null ? props.currentStructure.stage.stage : null}
                        </button>
                        <ToolTip content={'Etapa / atividade'}/>
                    </div>
                    <span
                        style={{
                            display: props.currentStructure.execution !== undefined && props.currentStructure.execution !== null ? 'flex' : 'none',
                            alignItems: 'center', maxWidth: '20%'
                        }}>
                    <ArrowBackIos style={{
                        fontSize: '.9rem',
                        color: '#666666',
                        transform: 'rotate(180deg) translateX(.35rem)'
                    }}/>
                    <button className={pStyles.headerButton} disabled={true}>
                        {props.currentStructure.execution !== undefined && props.currentStructure.execution !== null ? props.currentStructure.execution.current_execution : null}
                    </button>
                </span>
                </div>
            </div>
            <div className={styles.entityTitle}>
                {getTitle()}
            </div>
        </div>
    )
}

Header.propTypes = {
    currentStructure: PropTypes.object,
    project: PropTypes.object,
    setCurrentStructure: PropTypes.func
}