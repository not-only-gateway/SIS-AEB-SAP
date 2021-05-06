import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import mainStyles from "../../../styles/shared/Main.module.css";
import Accordion from "../../layout/Accordion";
import axios from "axios";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import EffectiveRoleForm from "../forms/EffectiveRoleForm";
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
            <EffectiveRole role={undefined} create={true} locale={props.locale} index={undefined} fetch={() => fetchEffectiveRoles().then(res => setData(res))}/>
            {(data).map((role, index) =>
                <EffectiveRole role={role} locale={props.locale} index={index} fetch={() => fetchEffectiveRoles().then(res => setData(res))}/>
            )}
        </div>
    )
}
EffectiveRoleList.propTypes = {
    locale: PropTypes.string
}