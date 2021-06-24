import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import PropTypes from "prop-types";
import PersonAvatar from "../../shared/PersonAvatar";

export default function PeopleList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)

    return (
        <List
            listKey={'people'}
            clickEvent={() => props.redirect(currentEntity.id)} createOption={true}
            fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/people'}
            renderElement={element => {
                return (
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                            <PersonAvatar variant={'circular'} image={element.image}/>
                            <div>
                                {element.name}
                            </div>
                            <div>
                                {element.corporate_email}
                            </div>
                        </div>
                        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                            <div style={{color: '#333333'}}>
                                {element.role}
                            </div>
                            <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                            <div style={{fontSize: '.9rem'}}>
                                {element.unit}
                            </div>
                        </div>
                    </div>
                )
            }} applySearch={props.notSearched} setAppliedSearch={props.setNotSearched}
            searchInput={props.searchInput}
            setEntity={setCurrentEntity}/>
    )

}
PeopleList.propTypes = {
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,

    redirect: PropTypes.func,
    searchInput: PropTypes.string
}