import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
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
            <AccessProfile profile={undefined} create={true} index={undefined} locale={props.locale} />
            {(data).map((profile, index) =>
                <AccessProfile profile={profile} index={index} locale={props.locale} />
            )}
        </div>
    )
}
AccessProfileList.propTypes = {
    locale: PropTypes.string
}