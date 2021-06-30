import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import animations from '../../styles/Animations.module.css'
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import UnitForm from "./UnitForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import EntityForm from "./EntityForm";

export default function EntityList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <EntityForm
                        returnToMain={() => {
                            setOpen(false)
                            props.setOpen(false)
                        }}
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
                    listKey={'entity'}
                    clickEvent={() => setOpen(true)} createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/entity'}
                    renderElement={element => {
                        return (
                            <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                <div>
                                    {element.denomination}
                                </div>
                                <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                <div>
                                    {element.acronym}
                                </div>
                            </div>
                        )
                    }}
                    setEntity={setCurrentEntity} applySearch={props.notSearched}
                    setAppliedSearch={props.setNotSearched}/>
            </div>
        </>
    )

}
EntityList.propTypes = {
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,

    redirect: PropTypes.func,
    searchInput: PropTypes.string
}