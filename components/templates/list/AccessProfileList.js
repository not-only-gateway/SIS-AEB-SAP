import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import mainStyles from "../../../styles/shared/Main.module.css";
import Accordion from "../../layout/Accordion";
import AccessProfileForm from "../forms/AccessProfileForm";
import axios from "axios";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import AccessProfile from "../../modules/entity/AccessProfile";
import fetchAccessProfiles from "../../../utils/fetch/FetchAccessProfiles";

export default function AccessProfileList(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        fetchAccessProfiles().then(res => setData(res))

    }, [])
    return (
        <div style={{
            display: 'grid',
            marginTop: '10px',
            width: '100%',
            gap: '16px'
        }}>
            <AccessProfile profile={undefined} create={true} index={undefined} locale={props.locale} fetch={() => fetchAccessProfiles().then(res => setData(res))}/>
            {(data).map((profile, index) =>
                <AccessProfile profile={profile} index={index} locale={props.locale} fetch={() => fetchAccessProfiles().then(res => setData(res))}/>
            )}
        </div>
    )
}
AccessProfileList.propTypes = {
    locale: PropTypes.string
}