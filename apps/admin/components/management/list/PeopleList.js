import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import PropTypes from "prop-types";
import PersonAvatar from "../../shared/PersonAvatar";

export default function PeopleList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)

    return (
        <List clickEvent={() => props.redirect(currentEntity.id)} createOption={true}
              fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/people'}
              renderElement={element => {
                  return (
                      <div style={{display: 'flex', gap: '16px'}}>
                          <PersonAvatar variant={'circular'} image={element.image}/>
                          {element.name}
                          {element.corporate_email}
                      </div>
                  )
              }} searched={!props.notSearched} setNotSearched={props.setNotSearched}
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