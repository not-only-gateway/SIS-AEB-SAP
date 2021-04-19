import PropTypes from 'prop-types'
import styles from '../../styles/activity/Activity.module.css'
import mainStyles from "../../styles/shared/Main.module.css";

export default function ActivityList(props){
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
ActivityList.propTypes={
    title: PropTypes.object,
    content: PropTypes.object
}