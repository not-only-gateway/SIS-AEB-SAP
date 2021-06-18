import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import Linkage from "../Linkage";
import OrganizationalRequests from "../../../utils/fetch/OrganizationalRequests";

export default function LinkageList(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        OrganizationalRequests.fetchLinkages().then(res => setData(res))
    }, [])
    return (
        <div style={{
            display: 'grid',
            marginTop: '10px',
            width: '100%',
            gap: '16px'
        }}>
            <Linkage create={true} locale={props.locale} linkage={undefined}/>
            {(data).map((linkage, index) =>
                <Linkage create={false} locale={props.locale} linkage={linkage} index={index}/>
            )}
        </div>
    )
}
LinkageList.propTypes = {
    locale: PropTypes.string
}