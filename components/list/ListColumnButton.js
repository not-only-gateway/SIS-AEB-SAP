import PropTypes from 'prop-types'
import styles from "../../styles/shared/Shared.module.css";
import {Button} from "@material-ui/core";
import {ArrowDropDownRounded} from "@material-ui/icons";
import {useState} from "react";

export default function ListColumnButton(props){
    const [filtered, setFiltered] = useState(false)
    return(
        <div key={'column'+props.index+'-button-container'} className={styles.listColumns}
             style={{width: props.size + 'vw'}}>
            <Button disabled={props.disabled || props.sorter === undefined} onClick={() =>{
                setFiltered(!filtered)
                if (props.sorter !== undefined)
                  props.sorter(!filtered)
            }} style={{
                padding: '0 10px 0 0 ',
                color: 'black',
                textTransform: 'none',
                width: props.size + 'vw',
                height: '100%',
                justifyContent: 'space-between'
            }} >
                {props.label}
                {props.disabled === true || props.sorter === undefined? null :
                    <ArrowDropDownRounded style={{transform: filtered ? 'rotate(180deg)' : null, transition: '300ms', fontSize: '1.7rem'}}/>
                }

            </Button>
        </div>
    )
}
ListColumnButton.propTypes={
    sorter: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.number,
    index: PropTypes.number
}