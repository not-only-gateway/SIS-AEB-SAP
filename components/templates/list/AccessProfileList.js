import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import mainStyles from "../../../styles/shared/Main.module.css";
import Accordion from "../../layout/Accordion";
import AccessProfileForm from "../forms/AccessProfileForm";
import axios from "axios";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";

export default function AccessProfileList(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: Host() + 'access_profiles',
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            setData(res.data)
        }).catch(error => {
            console.log(error)
        })

    }, [])
    return (
        <div style={{
            display: 'grid',
            marginTop: '10px',
            width: '100%',
            borderTop: 'hsla(210, 11%, 78%, 0.5)  .7px solid'
        }}>
            {(data).map((profile, index) =>
                <div key={profile.id} style={{borderBottom: 'hsla(210, 11%, 78%, 0.5)  .7px solid'}}>
                    <Accordion
                        elevation={false}
                        summary={
                            <p className={mainStyles.secondaryParagraph}>
                                {profile.denomination}
                            </p>
                        }
                        content={
                            <AccessProfileForm id={profile.id} locale={props.locale}/>
                        }
                        animationDelay={index * 200}
                        asRow={true} disabled={false} key={index + '-accordion-' + profile.id} dark={false}
                        background={undefined} openSize={100} closedSize={100}
                        asButton={false} onClick={props.redirect}
                    />
                </div>
            )}
        </div>
    )
}
AccessProfileList.propTypes = {
    locale: PropTypes.string
}