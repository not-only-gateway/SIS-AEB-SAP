import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import EffectiveRole from "../../modules/entity/EffectiveRole";
import fetchEffectiveRoles from "../../../utils/fetch/FetchEffectiveRoles";

export default function EffectiveRoleList(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        fetchEffectiveRoles().then(res => setData(res))
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