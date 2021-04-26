import PropTypes from 'prop-types'
import styles from '../../styles/shared/Shared.module.css'
import mainStyles from "../../styles/shared/Main.module.css";
import ListColumnButton from "./ListColumnButton";
import {useState} from "react";
import {Button, Modal} from "@material-ui/core";
import {FilterList, FilterListRounded, FilterRounded} from "@material-ui/icons";
import animations from '../../styles/shared/Animations.module.css'

export default function ListLayout(props) {
    const [modal, setModal] = useState(false)

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}>
                <div className={[styles.listFilterModal, animations.slideInRightAnimation].join(' ')}>
                    {props.filterComponent}
                </div>

            </Modal>
        )
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.listContainer} style={{width: props.width + '%'}}>
                <div className={styles.listTitle}
                     style={{
                         backgroundColor: '#e7e7e7',
                         width: '100%',
                         height: 'auto',
                     }}>
                    <div className={mainStyles.displayInlineSpaced} style={{height: '55px'}}>
                        <div className={mainStyles.primaryHeader}>
                            {props.title}
                        </div>
                        <Button onClick={() => setModal(true)}>
                            <FilterListRounded/>
                        </Button>
                    </div>
                    {props.basicSearchComponent}


                    <div className={mainStyles.rowContainer}>
                        {props.columns.map((column, index) => (
                            <div key={'column-' + index + '-list-container'}>
                                <ListColumnButton size={column.size} label={column.label}
                                                  index={index} sorterKey={column.key}
                                                  currentSorter={props.currentSorter}
                                                  handleSorterChange={props.handleSorterChange}/>
                            </div>

                        ))}
                    </div>
                </div>

                <div className={styles.listContent}>
                    {props.content}
                </div>
            </div>
            {renderModal()}
        </div>
    )
}
ListLayout.propTypes = {
    title: PropTypes.object,
    content: PropTypes.object,
    columns: PropTypes.array,
    filterComponent: PropTypes.object,
    basicSearchComponent: PropTypes.object,
    width: PropTypes.number,
    columnWidth: PropTypes.number,
    currentSorter: PropTypes.string,
    handleSorterChange: PropTypes.func
}