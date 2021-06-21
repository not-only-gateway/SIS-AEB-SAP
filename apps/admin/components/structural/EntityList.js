import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import animations from '../../styles/shared/Animations.module.css'
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import ContractualLinkageList from "../management/list/ContractualLinkageList";

export default function EntityList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    {/*<EffectiveRoleForm*/}
                    {/*    closeModal={() => setOpen(false)}*/}
                    {/*    // handleSubmit={submitLinkage}*/}
                    {/*    handleChange={event => handleObjectChange({*/}
                    {/*        event: event,*/}
                    {/*        setData: setCurrentEntity*/}
                    {/*    })}*/}
                    {/*    create={open && currentEntity === null}*/}
                    {/*    data={currentEntity}/>*/}
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List clickEvent={() => setOpen(true)} createOption={true}
                      fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/entity'}
                      secondaryLabel={'acronym'} primaryLabel={'denomination'}
                      setEntity={setCurrentEntity} searched={!props.notSearched} setNotSearched={props.setNotSearched}/>
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