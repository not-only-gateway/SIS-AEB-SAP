import PropTypes from 'prop-types'
import styles from '../../styles/shared/Shared.module.css'
import mainStyles from "../../styles/shared/Main.module.css";

export default function ListLayout(props){
    return(
        <div className={styles.listContainer}>
            <div className={styles.listTitle} style={{backgroundColor: 'white'}}>
                {props.title}
            </div>
            <div className={styles.listContent}>
                {props.content}
            </div>
        </div>
    )
}
ListLayout.propTypes={
    title: PropTypes.object,
    content: PropTypes.object
}