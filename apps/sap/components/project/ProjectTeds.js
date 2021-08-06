import PropTypes from "prop-types";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import {DeleteForeverRounded, EditRounded} from "@material-ui/icons";
import List from "../shared/misc/list/List";
import React, {useState} from "react";
import styles from '../../styles/Project.module.css'
import Modal from "../shared/misc/modal/Modal";
import Selector from "../shared/misc/selector/Selector";

export default function ProjectTeds(props) {
    const [modal, setModal] = useState(false)
    return (
        <div style={{background: 'white', borderRadius: '5px', display: 'grid', justifyItems: 'center'}}>
            <Selector
                getEntityKey={entity => {
                    if (entity !== null && entity !== undefined)
                        return entity.id
                    else return -1
                }} searchFieldName={'search_input'}
                handleChange={entity => {

                }} label={'Adicionar novo TED'}
                setChanged={() => null}
                disabled={false} width={'calc(100% - 64px)'}
                renderEntity={entity => {
                    if (entity !== undefined && entity !== null)
                        return (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%'
                            }}>

                                <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                    <div>
                                        {entity.number}
                                    </div>
                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                    <div>
                                        {entity.responsible}
                                    </div>
                                </div>
                                <div>
                                    {entity.process}
                                </div>

                            </div>
                        )
                    else
                        return null
                }} fetchUrl={Host() + 'list/free/project_teds'} fetchToken={(new Cookies()).get('jwt')}
                elementRootID={'root'} selectorKey={'teds-selector'}
            />


            <List
                listKey={'teds'}
                createOption={true}
                fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/project_teds'}
                renderElement={entity => {
                    return (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}>

                            <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                <div>
                                    {entity.number}
                                </div>
                                <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                <div>
                                    {entity.responsible}
                                </div>
                            </div>
                            <div>
                                {entity.process}
                            </div>

                        </div>
                    )
                }}
                clickEvent={(event, create) => {
                    setModal(true)
                }}
                setEntity={entity => {
                    if (entity !== null)
                        props.redirect(entity)
                }} searchFieldName={'search_input'} title={'Termos de Execução Descentralizada'}
                scrollableElement={'scrollableDiv'}
                fetchSize={15}
                fetchParams={{
                    project: props.project.id
                }}

            />
        </div>
    )
}

ProjectTeds.propTypes = {
    project: PropTypes.object,
    redirect: PropTypes.func
}