import PropTypes from 'prop-types'
import useList from "./hook/useList";
import TableLayout from "./components/TableLayout";
import styles from './styles/List.module.css'
import ListHeader from "./components/ListHeader";
export default function List(props){
    const hook = props.useList

    return (
        <div className={styles.container}>
            <ListHeader/>
            <div className={styles.tableWrapper}>
            <TableLayout data={hook.data} keys={hook.keys} controlButtons={hook.controlButtons}/>
            </div>
        </div>
    )
}

List.propTypes={
    useList: PropTypes.instanceOf(useList).isRequired,
    header: PropTypes.node
}