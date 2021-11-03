import React, {useState} from "react";
import PropTypes from "prop-types";
import ProjectForm from "../forms/ProjectForm";
import {ArrowForwardRounded, DeleteRounded} from "@material-ui/icons";
import projectKeys from "../../keys/projectKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import List from "../../../../core/visualization/list/List";
import getQuery from "../../queries/getQuery";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import styles from '../../styles/Shared.module.css'

export default function ProjectList(props) {

    const [open, setOpen] = useState(false)

    const hook = useQuery(getQuery('project'))

    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%', flexGrow: 1, maxHeight: '100%'}}>

                <ProjectForm
                    handleClose={() => {
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
                onRowClick={e => props.redirect(`/sap?page=project&id=${e.id}`)}
            />
        </Switcher>
    )
}
ProjectList.propTypes = {
    redirect: PropTypes.func
}