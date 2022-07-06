import React, {useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'

import WorkPlanList from "../components/lists/WorkPlanList";
import TedForm from "../components/forms/TedForm";
import TedList from "../components/lists/TedList";
import {fetchEntry} from "../utils/fetchData";

import {CategoryRounded, CloseRounded, HomeRounded} from "@material-ui/icons";

import ProjectTedList from "../components/lists/ProjectTedList";


import Host from "../utils/host";
import Cookies from "universal-cookie/lib";
import {Breadcrumbs, Button, request, Tab, ToolTip, VerticalTabs} from 'mfc-core'

export default function Ted(props) {
    const [ted, setTed] = useState({})
    const [project, setProject] = useState(null)
    const [lastAddendum, setLastAddendum] = useState(null)

    useEffect(() => {
        if (ted.id !== parseInt(props.query.id) && ted.id !== undefined)
            props.refresh()
        else {
            fetchEntry({
                pk: props.query.id,
                suffix: 'ted'
            }).then(res => {
                if (res) {
                    setTed(res)

                    request({
                        headers: {'authorization': (new Cookies()).get('jwt')},
                        method: 'get',
                        url: Host() + 'list/ted',
                        package: {
                            filters: JSON.stringify([{key: 'addendum_ted', value: res.id, type: 'object'}]),
                            sorts: JSON.stringify([{key: 'id', desc: true}]),
                            quantity: 1
                        }
                    }).then(r => setLastAddendum(r.data && r.data.length > 0 ? r.data[0] : null))
                }
            })
            if (props.query.project_id !== undefined)
                fetchEntry({
                    pk: props.query.project_id,
                    suffix: 'project'
                }).then(res => {
                    setProject(res)
                })

        }


    }, [props.query])

    const [open, setOpen] = useState(0)

    useEffect(() => {
        const t = props.query.tab
        setOpen(t !== undefined && !isNaN(parseInt(t)) ? parseInt(t) : 0)
    }, [props.query])

    return (
        <div className={shared.pageWrapper}>
            <Head>
                <title>{ted?.number}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <Breadcrumbs divider={'-'} justify={'start'}>
                <Button variant={"minimal-horizontal"}
                        onClick={() => {
                            props.redirect('/?page=index')
                        }}
                        styles={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <HomeRounded style={{fontSize: '1.1rem'}}/> Início
                </Button>
                {!ted.ted ? null :
                    <Button variant={"minimal"}
                            onClick={() => {

                                props.redirect('/?page=ted&id=' + ted.ted.id)}
                            } className={shared.button}>
                        Termo aditivo de {ted.ted.number}
                        <ToolTip>
                            Instrumento de celebração
                        </ToolTip>
                    </Button>
                }
                <Button variant={'minimal'} highlight={true}>
                    {ted?.number}
                </Button>
            </Breadcrumbs>

            <div style={{display: 'flex', width: '100%', alignItems: 'center'}}>
                <div className={shared.header}
                     style={{padding: '16px 24px'}}>
                    {ted?.number}

                    <div className={shared.typeLabel}>
                        <CategoryRounded style={{fontSize: '1.15rem'}}/> Instrumento de celebração
                    </div>
                </div>
                {project ?
                    <Button variant={"outlined"} color={"secondary"}
                            onClick={() => {
                                setProject(null)
                                props.redirect('/?page=ted&id=' + ted.id)
                            }}
                            styles={{display: 'flex', alignItems: 'center', gap: '4px', height: '30px'}}>
                        <CloseRounded style={{fontSize: '1.1rem'}}/>
                        Mapeando para Projeto/Atividade: {project?.name}
                        <ToolTip content={'Clique para remover mapeamento'}/>
                    </Button>
                    :
                    null
                }
            </div>

            {/*</div>*/}
            <div className={shared.pageContent}>
                <VerticalTabs
                    open={open}
                    setOpen={index => {
                        const url = {pathname: props.pathname, query: {...props.query, tab: index}}
                        props.redirect(url, url, {shallow: true})
                    }}
                    className={shared.wrapper}
                    styles={{display: 'flex', justifyContent: 'stretch', alignContent: 'unset', padding: '8px'}}
                >
                    <Tab label={'Dados'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <TedForm data={ted}/>
                    </Tab>
                    <Tab label={'Termos aditivos'} group={'Informações adicionais'} className={shared.tabWrapper}
                         styles={{padding: '0 10%'}}>
                        <TedList ted={ted} copyFrom={lastAddendum ? lastAddendum : ted} redirect={props.redirect}/>
                    </Tab>
                    {project ? null
                        :
                        <Tab label={'Projetos / Atividades relacionados'} group={'Acesso rápido'}
                             className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                            <ProjectTedList project={project} ted={ted} redirect={props.redirect}/>
                        </Tab>
                    }
                    <Tab label={'Planos de trabalho'} group={'Acesso rápido'} className={shared.tabWrapper}
                         styles={{padding: '0 10%'}}>
                        <WorkPlanList project={project} ted={ted} redirect={props.redirect}/>
                    </Tab>

                </VerticalTabs>
            </div>
        </div>
    )
}
Ted.propTypes = {
    refresh: PropTypes.func,
    query: PropTypes.object,
    redirect: PropTypes.func
}