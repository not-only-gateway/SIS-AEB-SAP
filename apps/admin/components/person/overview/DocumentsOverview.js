import PropTypes from 'prop-types'
import styles from "../../../styles/Person.module.css";
import DocumentsFormPT from "../../../packages/locales/person/DocumentsFormPT";

export default function DocumentsOverview(props){
    const lang = DocumentsFormPT

    return (
        <>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>CPF</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.cpf}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>RG</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.rg}
                </p>
            </div>

            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.issuing}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.issuing_body != null ? props.data.issuing_body : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.dispatch}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.dispatch_date != null ? props.data.dispatch_date : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.work}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.work_card != null ? props.data.work_card : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>PIS/PASEP</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.pis != null ? props.data.pis : lang.unset}

                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.bank}</p>

                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.bank != null ? props.data.bank : lang.unset}

                </p>
            </div>

            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.agency}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.agency != null ? props.data.agency : lang.unset}

                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.voter}</p>
                <p style={{fontSize: '.9rem'}}>
                    {props.data.voter_registration != null ? props.data.voter_registration : lang.unset}

                </p>
            </div>

            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.section}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.electoral_section != null ? props.data.electoral_section : lang.unset}
                </p>
            </div>
            <div className={styles.overviewRow}>
                <p style={{fontWeight: 600, fontSize: '.9rem'}}>{lang.zone}</p>
                <p style={{fontSize: '.9rem', textTransform: 'capitalize'}}>
                    {props.data.electoral_zone != null ? props.data.electoral_zone : lang.unset}
                </p>
            </div>
        </>
    )
}

DocumentsOverview.propTypes ={
    data: PropTypes.object
}