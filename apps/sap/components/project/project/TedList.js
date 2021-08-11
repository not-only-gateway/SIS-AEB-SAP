import React, {useState} from "react";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import PropTypes from "prop-types";
import animations from "../../../styles/Animations.module.css";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import List from "../../shared/misc/list/List";
import TedForm from "../../shared/TedForm";
import Selector from "../../shared/misc/selector/Selector";
import {ArrowForwardRounded, RemoveRounded} from "@material-ui/icons";

export default function TedList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <div style={{
            background: 'white',
            borderRadius: '5px',
            display: 'grid',
            justifyItems: 'center',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
        }}>
            {open ?
                null :
                <Selector
                    getEntityKey={entity => {
                        if (entity !== null && entity !== undefined)
                            return entity.id
                        else return -1
                    }} searchFieldName={'search_input'}
                    handleChange={entity => {

                    }} label={'Adicionar novo instrumento'}
                    setChanged={() => null}
                    disabled={false} width={'calc(100% - 64px)'}
                    fields={[
                        {name: 'number', type: 'string',label: 'Número'},
                        {name: 'responsible', type: 'string', label: 'Responsável'},
                        {name: 'process', type: 'string', label: 'Processo'}
                    ]}
                    fetchUrl={Host() + 'list/free/project_teds'}
                    fetchToken={(new Cookies()).get('jwt')}
                    elementRootID={'root'} selectorKey={'teds-selector'}
                />
            }
            {!open ? null :
                <div className={animations.fadeIn}>
                    <TedForm
                        returnToMain={() => {
                            setOpen(false)
                        }} redirect={props.redirect}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={true} project={props.project.id}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined, width: '100%'}}>
                <List
                    listKey={'teds'} noShadow={true}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/ted'}

                    fields={[
                        {name: 'number', type: 'string',label: 'Número'},
                        {name: 'responsible', type: 'string', label: 'Responsável'},
                        {name: 'process', type: 'string', label: 'Processo'}
                    ]}
                    clickEvent={() => null}
                    setEntity={entity => {
                        if (entity === null || entity === undefined) {
                            setOpen(true)
                        } else
                            props.redirect(entity.id)
                    }} searchFieldName={'search_input'} title={'Instrumento de celebração'}
                    scrollableElement={'scrollableDiv'}
                    options={[{
                        label: 'Remover vínculo',
                        icon: <RemoveRounded/>,
                        onClick: (entity) => {

                        },
                        disabled: false
                    },
                        {
                            label: 'Abrir',
                            icon: <ArrowForwardRounded/>,
                            onClick: (entity) => {
                                props.redirect(entity.id)
                            },
                            disabled: false
                        }

                    ]}

                    fetchParams={{
                    project: props.project.id
                }}
                    fetchSize={15}/>
            </div>
        </div>
    )
}
TedList.propTypes = {
    redirect: PropTypes.func,
    project: PropTypes.object
}