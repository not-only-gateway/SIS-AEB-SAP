import PropTypes from 'prop-types'
import React from "react";
import mainStyles from "../../styles/shared/Main.module.css";
import {getTertiaryColor} from "../../styles/shared/MainStyles";
import Accordion from "../layout/Accordion";
import ProfilePersona from "../elements/profile/ProfilePersona";
import {Button} from "@material-ui/core";
import AccessProfileForm from "../modules/forms/AccessProfileForm";

export default function AccessProfileList(props) {

    return (
        <div style={{display: 'grid', marginTop: '10px', width: '100%', borderTop: 'hsla(210, 11%, 78%, 0.5)  .7px solid'}}>
            {(props.data).map((profile, index) =>
                <div key={profile.id} style={{borderBottom: 'hsla(210, 11%, 78%, 0.5)  .7px solid'}}>
                    <Accordion
                        elevation={false}
                        summary={
                            <p className={mainStyles.secondaryParagraph}>
                                {profile.denomination}
                            </p>
                        }
                        content={
                                <AccessProfileForm data={profile} locale={props.locale}/>
                        }
                        animationDelay={index * 200}
                        asRow={true} disabled={false} key={index + '-accordion-'+ profile.id} dark={false}
                        background={undefined} openSize={100} closedSize={100}
                        asButton={false} onClick={props.redirect}
                    />
                </div>
            )}
        </div>
    )
}
AccessProfileList.propTypes ={
    data: PropTypes.array,
    locale: PropTypes.string
}