import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import animations from "../../styles/Animations.module.css";
import UnitForm from "./UnitForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";

export default function UnitList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <UnitForm
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
                    listKey={'unit'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/unit'}
                    renderElement={element => {
                        return (
                            <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                <div>
                                    {element.name}
                                </div>
                                <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                <div>
                                    {element.acronym}
                                </div>
                            </div>
                        )
                    }}
                    clickEvent={() => null}
                    setEntity={entity => {
                        if (entity === null || entity === undefined) {
                            setOpen(true)
                            props.setOpen(true)
                        }
                        else
                            props.redirect(entity.id)
                    }} applySearch={props.notSearched}
                    setAppliedSearch={props.setNotSearched}/>
            </div>
        </>
    )
}
UnitList.propTypes = {
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func, setOpen: PropTypes.func,
    redirect: PropTypes.func,
    searchInput: PropTypes.string
}