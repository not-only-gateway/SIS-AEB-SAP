import PropTypes from 'prop-types'
import styles from "../../../styles/shared/Shared.module.css";
import {Button} from "@material-ui/core";
import {ArrowDropDownRounded} from "@material-ui/icons";
import {useState} from "react";

export default function ListColumnButton(props){
    const [sorted, setSorted] = useState(false)
    return(
        <div key={'column'+props.index+'-button-container'} className={styles.listColumns}>
            <Button disabled={(props.currentSorter !== undefined && props.currentSorter !== props.sorterKey) || props.sorterKey === undefined} onClick={() =>{
                setSorted(!sorted)
                props.handleSorterChange(props.sorterKey)
            }} style={{
                padding: 0,
                color: 'black',
                textTransform: 'none',
                height: '100%',
                width: '100%',
                justifyContent: 'space-between'
            }}>
                {props.label}
                {(props.currentSorter !== undefined && props.currentSorter !== props.sorterKey) || props.sorterKey === undefined ? null :
                    <ArrowDropDownRounded style={{transform: sorted ? 'rotate(180deg)' : null, transition: '300ms', fontSize: '1.7rem'}}/>
                }

            </Button>
        </div>
    )
}
ListColumnButton.propTypes={
    sorterKey: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.number,
    index: PropTypes.number,
    currentSorter: PropTypes.string,
    handleSorterChange: PropTypes.func
}