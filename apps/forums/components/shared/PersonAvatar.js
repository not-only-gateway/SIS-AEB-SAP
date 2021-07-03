import PropTypes from 'prop-types'
import {Avatar} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PersonRequests from "../../utils/fetch/PersonRequests";

export default function PersonAvatar(props) {
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (props.image !== null && props.image !== undefined)
            PersonRequests.FetchImage(props.image).then(res => setImage(res))
    })

    return (

            <Avatar src={image}
                    style={{
                        height: props.size,
                        width: props.size,
                        boxShadow: props.elevation === false ? null : 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px',
                        borderRadius: props.variant === 'rounded' ? '8px' : null,
                        transition: '250ms ease-in-out'
                    }} variant={props.variant}/>
    )
}

PersonAvatar.propTypes = {
    image: PropTypes.string,
    size: PropTypes.string,
    variant: PropTypes.string,
    elevation: PropTypes.bool,
}