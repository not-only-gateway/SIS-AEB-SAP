import PropTypes from 'prop-types'
import styles from '../../styles/Person.module.css'
import ContractualLinkagePT from "../../packages/locales/person/ContractualLinkagePT";

export default function ContractualLinkageOverview(props) {
    const lang = ContractualLinkagePT

    return (
        <>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.denomination}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.denomination != null ? props.data.denomination : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.description}</p>
                <p style={{fontSize: '.9rem', textTransform: 'lowercase'}}>
                    {props.data.description != null ? props.data.description : lang.unset}
                </p>
            </div>

            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.legalDocument}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.legal_document != null ? props.data.legal_document : lang.unset}
                </p>
            </div>
            {props.data.contract !== null ?
                <div className={styles.overviewRow}>
                    <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.contract}</p>
                    <p style={{fontSize: '.9rem'}}>
                        {props.data.contract.sei}
                    </p>
                </div>
                :
                <div className={styles.overviewRow}>
                    <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.effective}</p>
                    <p style={{fontSize: '.9rem'}}>
                        {props.data.effective_role.denomination}
                    </p>
                </div>
            }

            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.entity}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.entity.acronym}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.publication}</p>
                <p style={{fontSize: '.9rem'}}>
                    {new Date(props.data.official_publication_date).toLocaleDateString()}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.admission}</p>
                <p style={{fontSize: '.9rem'}}>
                    {new Date(props.data.admission_date ).toLocaleDateString()}
                </p>
            </div>

        </>
    )

}

ContractualLinkageOverview.propTypes = {
    data: PropTypes.object
}