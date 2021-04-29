import PropTypes from 'prop-types'
import {Avatar} from "@material-ui/core";
import ImageHost from "../../../utils/shared/ImageHost";
import {getBoxShadow} from "../../../styles/shared/MainStyles";
import React from "react";
import mainStyles from '../../../styles/shared/Main.module.css'
import {CakeRounded} from "@material-ui/icons";

export default function ProfilePersona(props) {
console.log(props.image)
    return (
        <div key={props.key} style={{position: 'relative'}}>
            <Avatar src={typeof(props.image) === 'string' ? (props.base64 ? props.image : (ImageHost()+props.image)) : undefined}
                    style={{
                        height: props.size,
                        width: props.size,
                        boxShadow: props.elevation === false ? null : 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px',
                        borderRadius: props.variant === 'rounded' ? '8px' : null
                    }} variant={props.variant}/>
            {props.cakeDay === true ?
                <div className={mainStyles.displayInlineCenter} style={{
                    width: '30px',
                    height: '30px',
                    position: 'absolute',
                    bottom: '-5%',
                    left: '-5%',
                    background: 'white',
                    borderRadius: '16px'
                }}>
                    <CakeRounded style={{color: '#f54269', fontSize: '1.4rem'}}/>
                </div>
                :
                null
            }
        </div>
    )
}

ProfilePersona.propTypes = {
    dark: PropTypes.bool,
    image: PropTypes.string,
    cakeDay: PropTypes.bool,
    key: PropTypes.any,
    size: PropTypes.string,
    variant: PropTypes.string,
    elevation: PropTypes.bool,
    base64: PropTypes.bool
}