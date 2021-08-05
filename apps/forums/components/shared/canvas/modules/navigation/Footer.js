import PropTypes from 'prop-types'
import styles from './styles/Footer.module.css'
import Scale from "./misc/Scale";


export default function Footer(props){
    return(
        <div className={styles.footer}>
            <Scale {...props}/>
        </div>
    )
}

Footer.propTypes={
    setScale: PropTypes.func,
    scale: PropTypes.number
}