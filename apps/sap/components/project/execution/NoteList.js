import React, {useState} from "react";
import Selector from "../../shared/misc/selector/Selector";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import animations from "../../../styles/Animations.module.css";
import TedForm from "../../shared/TedForm";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import List from "../../shared/misc/list/List";
import {ArrowForwardRounded, RemoveRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import {allowedStatusCodes} from "next/dist/lib/load-custom-routes";
import NoteForm from "./NoteForm";

export default function NoteList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <div>
            {!open ? null :
                <div className={animations.fadeIn} style={{width: '100%'}}>
                    <NoteForm
                        returnToMain={() => {
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={currentEntity === undefined || currentEntity === null || currentEntity.id === undefined}
                        execution={props.execution.id}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined, width: '100%'}}>
                <List
                    listKey={'notes'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/note'}

                    fields={[
                        {name: 'number', type: 'string',label: 'Número'},
                        {name: 'value', type: 'number', maskStart: 'R$', label: 'Valor'}
                    ]}
                    clickEvent={() => null}
                    setEntity={entity => {
                        setOpen(true)
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Notas de empenho'}
                    scrollableElement={'scrollableDiv'}
                    options={[{
                        label: 'Remover',
                        icon: <RemoveRounded/>,
                        onClick: (entity) => {

                        },
                        disabled: false
                    },
                        {
                            label: 'Abrir',
                            icon: <ArrowForwardRounded/>,
                            onClick: (entity) => {

                            },
                            disabled: false
                        }

                    ]}

                    fetchParams={{
                        execution: props.execution.id
                    }}
                    fetchSize={15}/>
            </div>
        </div>
    )


}
NoteList.propTypes ={
    execution: PropTypes.object
}