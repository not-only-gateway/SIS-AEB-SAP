import PropTypes from 'prop-types'
import React, {useState} from "react";
import animations from "../../../styles/Animations.module.css";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import List from "../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";

import {EditRounded} from "@material-ui/icons";
import AddendumForm from "./AddendumForm";

export default function AddendumList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <div style={{width: '100%'}}>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <AddendumForm
                        returnToMain={() => {
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })} ted={props.ted}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} project={props.project}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/addendum'}
                    fields={[
                        {name: 'number', type: 'string',label: 'Número'},
                        {name: 'global_value', type: 'number', label: 'valor global'},
                    ]}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Termos aditivos'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    fetchParams={{
                        ted: props.ted.id
                    }}
                    />
            </div>
        </div>
    )
}
AddendumList.propTypes = {
    ted: PropTypes.object
}