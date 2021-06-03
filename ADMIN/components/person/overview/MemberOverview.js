import PropTypes from 'prop-types'
import styles from '../../../styles/Person.module.css'
import {Avatar} from "@material-ui/core";
import ImageHost from "../../../utils/shared/ImageHost";
import {useEffect, useState} from "react";

import PersonOverviewPT from "../../../packages/page locales/person/PersonOverviewPT";
import MemberOverviewPT from "../../../packages/page locales/person/MemberOverviewPT";

export default function MemberOverview(props) {
    const lang = MemberOverviewPT

    return (
        <div className={styles.overviewContainer}>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.registration}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.registration != null ? props.data.registration : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.corporateEmail}</p>
                <p style={{fontSize: '.9rem', textTransform: 'lowercase'}}>
                    {props.data.corporate_email != null ? props.data.corporate_email : lang.unset}
                </p>
            </div>

            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.extension}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.extension != null ? props.data.extension : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.altPhone}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.alternative_phone != null ? props.data.alternative_phone : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.homeOffice}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.home_office != null ? lang.getHomeOffice(props.data.home_office) : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.entity}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.entity != null ? props.data.entity.key : lang.unset}

                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.mainCollaboration}</p>

                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.main_collaboration_tag != null ? props.data.main_collaboration_tag : lang.unset}

                </p>
            </div>

        </div>
    )

}

MemberOverview.propTypes = {
    data: PropTypes.object
}