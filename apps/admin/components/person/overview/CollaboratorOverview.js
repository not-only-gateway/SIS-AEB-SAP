import PropTypes from 'prop-types'
import styles from '../../../styles/Person.module.css'
import MemberOverviewPT from "../../../packages/locales/person/MemberOverviewPT";

export default function CollaboratorOverview(props) {
    const lang = MemberOverviewPT

    return (
        <>
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
                    {props.data.alternative_phone != null && props.data.alternative_phone.length > 0 ? props.data.alternative_phone : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.homeOffice}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.home_office != null ? lang.getHomeOffice(props.data.home_office) : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.access}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.access_profile.denomination}
                </p>
            </div>

        </>
    )

}

CollaboratorOverview.propTypes = {
    data: PropTypes.object
}