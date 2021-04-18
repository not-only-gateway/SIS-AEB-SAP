import PropTypes from 'prop-types'
import {Avatar} from "@material-ui/core";
import ImageHost from "../../utils/shared/ImageHost";
import {getBorder, getBoxShadow, getSecondaryBackground} from "../../styles/shared/MainStyles";
import React from "react";
import mainStyles from '../../styles/shared/Main.module.css'
import {CakeRounded} from "@material-ui/icons";

export default function AvatarLayout(props) {

    return (
        <div key={props.key}>
            <Avatar src={props.image !== undefined ? ImageHost() + props.image : null}
                    style={{
                        ...{height: '100px', width: '100%', borderRadius: ' 8px ', margin: 'auto'},
                        ...getBoxShadow({dark: props.dark})
                    }}/>
            {props.cakeDay === true ?
                <div className={mainStyles.displayInlineCenter} style={{...{width: '32px', height: '32px', position: 'absolute', top: '28%', left:'5.5%', borderRadius: '16px'}, ...getSecondaryBackground({dark: props.dark})}}>
                    <CakeRounded style={{color: '#f54269', fontSize: '1.4rem'}}/>
                </div>
                :
                null
            }

        </div>
    )
}

AvatarLayout.propTypes={
    dark: PropTypes.bool,
    image: PropTypes.string,
    cakeDay: PropTypes.bool,
    key: PropTypes.number
}