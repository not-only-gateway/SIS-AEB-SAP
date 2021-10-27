import React, {useMemo} from "react";
import {DeleteRounded} from "@material-ui/icons";
import deleteEntry from "../../utils/requests/delete";

import PropTypes from "prop-types";
import getQuery from "../../queries/getQuery";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import associativeKeys from "../../keys/associativeKeys";
import List from "../../../../core/visualization/list/List";

export default function ProjectTedList(props) {

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

    return (

        <List
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
    )
}

ProjectTedList.propTypes = {
    redirect: PropTypes.func,
    ted: PropTypes.object,
    project: PropTypes.object
}
