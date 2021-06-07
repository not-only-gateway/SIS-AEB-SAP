import PropTypes from 'prop-types'
import styles from "../../../styles/Person.module.css";
import AddressOverviewPT from "../../../packages/locales/person/AddressOverviewPT";

export default function AddressOverview(props){
    const lang = AddressOverviewPT
    return (
        <div className={styles.overviewContainer}>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.zipCode}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.zip_code}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.address}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.address != null ? props.data.address : lang.unset}
                </p>
            </div>

            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.complement}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.address_complement != null ? props.data.address_complement : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.state}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.state != null ? props.data.state : lang.unset}
                </p>
            </div>

            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.city}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.city != null ? props.data.city : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.stateInitials}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.state_initials != null ? props.data.state_initials : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.neighborhood}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.neighborhood != null ? props.data.neighborhood : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.street}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.street != null ? props.data.street : lang.unset}
                </p>
            </div>
        </div>
    )

}

AddressOverview.propTypes ={
    data: PropTypes.object
}