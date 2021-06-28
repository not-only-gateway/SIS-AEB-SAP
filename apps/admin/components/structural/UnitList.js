import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import animations from '../../styles/Animations.module.css'
import Host from "../../utils/shared/Host";
import UnitForm from "../structural/UnitForm";
import PropTypes from "prop-types";

export default function UnitList(props) {

    return (
        <List
            listKey={'unit'}
            createOption={true}
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
            clickEvent={() => null}
            setEntity={entity => props.redirect(entity.id)} applySearch={props.notSearched}
            setAppliedSearch={props.setNotSearched}/>
    )

}
UnitList.propTypes = {
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,

    redirect: PropTypes.func,
    searchInput: PropTypes.string
}