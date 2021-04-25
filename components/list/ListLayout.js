import PropTypes from 'prop-types'
import styles from '../../styles/shared/Shared.module.css'
import mainStyles from "../../styles/shared/Main.module.css";
import ListColumnButton from "./ListColumnButton";

export default function ListLayout(props) {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.listContainer} style={{width: props.width + '%'}}>
                <div className={styles.listTitle}
                     style={{
                         backgroundColor: 'white',
                         width: '100%',
                         height: props.filterVerticalOrientation ? '15vh' : '20vh',
                         borderBottom: '#e5e6e8 1px solid'
                     }}>
                    <div style={{height: '5vh', marginRight: 'auto'}}>
                        {props.title}
                    </div>
                    {props.filterVerticalOrientation ?
                        null :
                        props.filterComponent
                    }

                    <div className={mainStyles.rowContainer}
                         style={{height: '5vh'}}>
                        {props.columns.map((column, index) => (
                            <div key={'column-' + index + '-list-container'}        >
                                <ListColumnButton size={column.size} label={column.label}
                                                  index={index} sorterKey={column.key} currentSorter={props.currentSorter}
                                                  handleSorterChange={props.handleSorterChange}/>
                            </div>

                        ))}
                    </div>
                </div>

                <div className={styles.listContent}>
                    {props.content}
                </div>
            </div>
            {props.filterVerticalOrientation ? props.filterComponent : null}
        </div>
    )
}
ListLayout.propTypes = {
    title: PropTypes.object,
    content: PropTypes.object,
    columns: PropTypes.array,
    filterComponent: PropTypes.object,
    filterVerticalOrientation: PropTypes.bool,
    width: PropTypes.number,
    columnWidth: PropTypes.number,
    currentSorter: PropTypes.string,
    handleSorterChange: PropTypes.func
}