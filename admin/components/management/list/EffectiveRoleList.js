import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import EffectiveRole from "../EffectiveRole";
import OrganizationalRequests from "../../../utils/fetch/OrganizationalRequests";


export default function EffectiveRoleList(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        OrganizationalRequests.fetchEffectiveRoles().then(res => setData(res))
    }, [])
    return (
        <div style={{
            display: 'grid',
            marginTop: '10px',
            width: '100%',
            gap: '16px'
        }}>
            <EffectiveRole role={undefined} create={true} locale={props.locale} index={undefined} />
            {(data).map((role, index) =>
                <EffectiveRole role={role} locale={props.locale} index={index}/>
            )}
        </div>
    )
}
EffectiveRoleList.propTypes = {
    locale: PropTypes.string
}