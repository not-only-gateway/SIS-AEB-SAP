import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import Linkage from "../../modules/entity/Linkage";
import fetchLinkages from "../../../utils/fetch/FetchLinkages";
import fetchCommissionedRoles from "../../../utils/fetch/FetchCommissionedRoles";
import CommissionedRole from "../../modules/entity/CommissionedRole";

export default function CommissionedRoleList(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        fetchCommissionedRoles().then(res => setData(res))
    }, [])
    return (
        <div style={{
            display: 'grid',
            marginTop: '10px',
            width: '100%',
            gap: '16px'
        }}>
            <CommissionedRole create={true} locale={props.locale} role={undefined} fetch={() => fetchCommissionedRoles().then(res => setData(res))}/>
            {(data).map((role, index) =>
                <div key={role.id + '-commissioned-role-'+index}>
                    <CommissionedRole create={false} locale={props.locale} role={role} index={index} fetch={() => fetchCommissionedRoles().then(res => setData(res))}/>
                </div>
            )}
        </div>
    )
}
CommissionedRoleList.propTypes= {
    locale: PropTypes.string
}