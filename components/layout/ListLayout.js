import PropTypes from 'prop-types'
import styles from '../../styles/shared/Shared.module.css'
import mainStyles from "../../styles/shared/Main.module.css";
import {Divider} from "@material-ui/core";

export default function ListLayout(props) {
    return (
        <div className={styles.pageContainer} style={{width: props.width+'%'}}>
            <div className={styles.listContainer} style={{transform: 'translateX(-8px)'}}>
                <div className={styles.listTitle}
                     style={{backgroundColor: 'white',  width: '100%',height: '15vh', borderBottom: '#e5e6e8 1px solid'}}>
                    <div style={{height: '5vh', marginRight: 'auto'}}>
                        {props.title}
                    </div>
                    <div className={mainStyles.displayInlineSpaced} style={{height: 'fit-content', width: props.columnWidth + 'vw'}}>
                        {props.columns.map(column => (
                            <div className={styles.listColumns} style={{width: column.size + 'vw'}}>

                                {/*{column.divider === false ? null :*/}
                                {/*    <Divider orientation={"vertical"} style={{height: '100%', width: '1px', marginRight: '2px'}}/>*/}
                                {/*}*/}
                                {column.label}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.listContent}>
                    {props.content}
                </div>
            </div>
            {props.filterComponent}
        </div>
    )
}
ListLayout.propTypes = {
    title: PropTypes.object,
    content: PropTypes.object,
    columns: PropTypes.object,
    filterComponent: PropTypes.func,
    width: PropTypes.number,
    columnWidth: PropTypes.number
}