import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import LinkageForm from "../forms/LinkageForm";
import Host from "../../../utils/shared/Host";
import animations from "../../../styles/shared/Animations.module.css";
import BaseForm from "../../person/forms/BaseForm";
import PropTypes from "prop-types";

export default function PeopleList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)

    return (
        <List clickEvent={() => props.redirect(currentEntity.id)} createOption={true}
              fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/people'}
              secondaryLabel={'corporate_email'} primaryLabel={'name'}
              setEntity={setCurrentEntity}/>
    )

}
PeopleList.propTypes = {
    redirect: PropTypes.func
}