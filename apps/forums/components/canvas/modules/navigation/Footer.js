import PropTypes from 'prop-types'
import styles from './styles/Footer.module.css'
import Scale from "./misc/Scale";
import Pages from "./misc/Pages";


export default function Footer(props){
    return(
        <div className={styles.footer}>
            <Pages {...props}/>
            <Scale {...props}/>
        </div>
    )
}

Footer.propTypes={
    setScale: PropTypes.func,
    scale: PropTypes.number,
    data: PropTypes.object,
    setData: PropTypes.func,
    contextMenuRef: PropTypes.object
}