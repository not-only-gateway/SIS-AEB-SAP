import React, {useState} from "react";
import PropTypes from "prop-types";
import {useQuery} from "sis-aeb-core";
import ProjectForm from "../forms/ProjectForm";
import {ArrowForwardRounded, DeleteRounded} from "@material-ui/icons";
import projectKeys from "../../keys/projectKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../../management/utils/delete";
import List from "../../../../core/list/List";
import getQuery from "../../queries/getQuery";

export default function ProjectList(props) {

    const [open, setOpen] = useState(false)

    const hook = useQuery(getQuery('project'))

    return (
        <Switcher openChild={open ? 0 : 1}>
                <ProjectForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }} redirect={props.redirect}

                    create={true}
                  />
                <List
                    hook={hook}
                    keys={projectKeys.project}
                    createOption={true}
                    title={'Projetos / Atividades'}
                    controlButtons={[
                        {
                            label: 'Abrir',
                            icon: <ArrowForwardRounded/>,
                            onClick: (entity) => {
                                props.redirect(entity.id)
                            },
                            disabled: false
                        },
                        {
                            label: 'Deletar',
                            icon: <DeleteRounded/>,
                            onClick: (entity) => {
                                deleteEntry({
                                    suffix: 'project',
                                    pk: entity.id
                                }).then(() => hook.clean())
                            },
                            disabled: false,
                            color: '#ff5555'
                        }
                    ]} onCreate={() => setOpen(true)}
                    onRowClick={(entity) => props.redirect(entity.id)}
                />
            </Switcher>
    )
}
ProjectList.propTypes = {
    redirect: PropTypes.func
}