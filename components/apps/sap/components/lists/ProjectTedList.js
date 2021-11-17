import React, {useMemo, useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import deleteEntry from "../../utils/delete";

import PropTypes from "prop-types";
import getQuery from "../../utils/getQuery";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import associativeKeys from "../../keys/associativeKeys";
import List from "../../../../core/visualization/list/List";
import TedForm from "../forms/TedForm";
import {Switcher} from "mfc-core";
import submit from "../../utils/submit";
import ProjectTedForm from "../forms/ProjectTedForm";

export default function ProjectTedList(props) {
    const [open, setOpen] = useState(props.project ? 2 : 1)

    const relations = useMemo(() => {
        if (props.ted)
            return {
                ted: props.ted.id
            }
        else if (props.project)
            return {
                activity_project: props.project.id
            }
        else
            return {}
    }, [props.project, props.ted])

    const query = useMemo(() => {
        return getQuery('project_ted', relations)
    }, [])
    const hook = useQuery(query)
    const keys = useMemo(() => {
        if (props.ted)
            return associativeKeys.projectTed.filter(e => e.key !== 'ted')
        else
            return associativeKeys.projectTed.filter(e => e.key !== 'activity_project')
    }, [props.project, props.ted])
    const options = useMemo(() => {
        let r = [{label: 'Vincular novo instrumento de celebração', onClick: () => setOpen(props.project ? 1 : 0)}]

        if (props.project)
            r.push({label: 'Criar novo instrumento de celebração', onClick: () => setOpen(0)},)

        return r
    }, [props])
    return (
        <Switcher openChild={open} styles={{width: '100%', height: '100%'}}>
            {props.project ?
                <TedForm
                    handleClose={() => {
                        setOpen(2)
                        hook.clean()
                    }}
                    onCreationSuccess={(ted) => {
                        if (ted)
                            submit({
                                suffix: 'project_ted',
                                data: {
                                    'activity_project': props.project?.id,
                                    'ted': ted.id
                                },
                                create: true
                            }).then(res => {
                                hook.clean()
                            })
                    }}
                    data={{}}
                    create={true}
                />
                :
                null
            }
            <ProjectTedForm ted={props.ted} project={props.project} handleClose={() => {
                setOpen(props.project ? 2 : 1)
                hook.clean()
            }}
            />
            <List
                options={options}

                noFilters={true}
                onRowClick={e => {
                    if (!props.ted)
                        props.redirect(`/sap?page=ted&id=${e.ted.id}`)
                    else if (!props.project)
                        props.redirect(`/sap?page=project&id=${e.activity_project.id}`)
                }}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'project_ted',
                            customPackage: {
                                project: entity.activity_project.id,
                                ted: entity.ted.id
                            }
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                hook={hook}
                keys={keys}
                title={props.project ? 'Instrumentos de celebração relacionados' : 'Projetos / Atividades relacionados'}
            />
        </Switcher>
    )
}

ProjectTedList.propTypes = {
    redirect: PropTypes.func,
    ted: PropTypes.object,
    project: PropTypes.object
}
