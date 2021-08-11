import React, {useState} from "react";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import animations from "../../styles/Animations.module.css";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import List from "../shared/misc/list/List";
import ProjectForm from "./ProjectForm";

export default function ProjectList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <ProjectForm
                        returnToMain={() => {
                            setOpen(false)
                            props.setOpen(false)
                        }} redirect={props.redirect}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={true}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/project'}
                    fields={[
                        {name: 'name', type: 'string',label: 'nome'},
                        {name: 'description', type: 'string',label: 'descrição'},
                        {name: 'estimated_value', type: 'number', maskStart: 'R$', label: 'Valor estimado'}
                    ]}
                    clickEvent={() => null}
                    setEntity={entity => {
                        if (entity === null || entity === undefined) {
                            setOpen(true)
                            props.setOpen(true)
                        } else
                            props.redirect(entity.id)
                    }} searchFieldName={'search_input'} title={'Projetos / Atividades'}
                    scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                />
            </div>
        </>
    )
}
ProjectList.propTypes = {
    redirect: PropTypes.func
}