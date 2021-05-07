import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import animations from '../../styles/shared/Animations.module.css'
import React from "react";
import {Button} from "@material-ui/core";
import {CheckRounded} from "@material-ui/icons";
import ActiveFilter from "../modules/ActiveFilter";

export default function FiltersComponent(props) {

    return (

        <div className={mainStyles.displayWarp}
             style={{gap: '16px', width: '100%', height: 'auto', paddingBottom: '8px', paddingTop: '8px'}}>
            <Button onClick={() => props.applyChanges()} style={{
                backgroundColor: '#0095ff',
                color: 'white',
                display: props.changed ? null : 'none'
            }} variant={"contained"} className={animations.popInAnimation}>
                <CheckRounded/>
            </Button>
            {props.activeFilters.map((filter, index) => {
                if (filter.value !== null)
                    return (
                        <ActiveFilter filter={filter} index={index} handleChange={props.handleChange} setChanged={props.setChanged}/>
                    )
                else
                    return null
            })}

        </div>)
}

FiltersComponent.propTypes ={
    activeFilters: PropTypes.array,
    active: PropTypes.bool,
    handleChange: PropTypes.func,
    applyChanges: PropTypes.func,
    changed: PropTypes.bool,
    setChanged: PropTypes.func
}