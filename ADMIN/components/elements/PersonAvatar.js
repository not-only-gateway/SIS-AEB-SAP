import PropTypes from 'prop-types'
import {Avatar} from "@material-ui/core";
import ImageHost from "../../utils/shared/ImageHost";
import React from "react";
import animations from '../../styles/shared/Animations.module.css'

export default function PersonAvatar(props) {
    return (
        <div style={{position: 'relative'}} className={animations.fadeIn}>
            <Avatar src={typeof(props.image) === 'string' ? (props.base64 ? props.image : (ImageHost()+props.image)) : undefined}
                    style={{
                        height: props.size,
                        width: props.size,
                        boxShadow: props.elevation === false ? null : 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px',
                        borderRadius: props.variant === 'rounded' ? '8px' : null,
                        transition: '300ms ease-in-out'

                    }} variant={props.variant}/>
            {props.absoluteContent ?
                <div style={{

                    position: 'absolute',
                    bottom: '-8px',
                    right: '-8px',
                }}>
                    {props.absoluteContent}
                </div>
                :
                null
            }
        </div>
    )
}

PersonAvatar.propTypes = {
    dark: PropTypes.bool,
    image: PropTypes.string,
    cakeDay: PropTypes.bool,
    size: PropTypes.string,
    variant: PropTypes.string,
    elevation: PropTypes.bool,
    base64: PropTypes.bool,
    absoluteContent: PropTypes.any
}