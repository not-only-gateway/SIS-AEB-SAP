import PropTypes from 'prop-types'
import styles from './styles/Header.module.css'

export default function Header(props){
    return(
        <div className={styles.container} style={{marginTop: props.marginTop ? '16px' : undefined}}>
            <div className={styles.title}>
                {props.title}
            </div>
            <div className={styles.information} style={{display: props.information === undefined ? 'none' : undefined}}>
                {props.information}
            </div>
        </div>
    )
}

Header.propTypes={
    title: PropTypes.string,
    information: PropTypes.string,
    marginTop: PropTypes.bool
}