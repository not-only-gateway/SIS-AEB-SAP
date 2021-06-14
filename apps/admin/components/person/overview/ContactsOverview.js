import PropTypes from 'prop-types'
import styles from "../../../styles/Person.module.css";
import ContactsOverviewPT from "../../../packages/locales/person/ContactsOverviewPT";

export default function ContactsOverview(props){
    const lang = ContactsOverviewPT
    return (
        <div className={styles.overviewContainer}>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.email}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.personal_email}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.emailAlt}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.personal_email_alt != null ? props.data.personal_email_alt : lang.unset}
                </p>
            </div>

            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.phone}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.personal_phone != null ? props.data.personal_phone : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.phoneAlt}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.personal_phone_alt != null ? props.data.personal_phone_alt : lang.unset}
                </p>
            </div>

        </div>
    )
}

ContactsOverview.propTypes ={
    data: PropTypes.object
}