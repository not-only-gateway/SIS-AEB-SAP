import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import animations from '../../styles/Animations.module.css'
import Host from "../../utils/shared/Host";
import UnitForm from "../structural/UnitForm";
import PropTypes from "prop-types";

export default function UnitList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <UnitForm
                        closeModal={() => setOpen(false)}
                        // handleSubmit={submitLinkage}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={open && currentEntity === null}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'unit'}
                    clickEvent={() => setOpen(true)} createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/unit'}
                    renderElement={element => {
                        return (
                            <div style={{display: 'flex', gap: '16px'}}>
                                <div>
                                    {element.name}
                                </div>
                                <div>
                                    {element.acronym}
                                </div>
                            </div>
                        )
                    }}
                    setEntity={setCurrentEntity}  applySearch={props.notSearched} setAppliedSearch={props.setNotSearched}/>
            </div>
        </>
    )

}
UnitList.propTypes = {
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,

    redirect: PropTypes.func,
    searchInput: PropTypes.string
}