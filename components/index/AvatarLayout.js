import PropTypes from 'prop-types'
import {Avatar} from "@material-ui/core";
import ImageHost from "../../utils/shared/ImageHost";
import {getBorder, getBoxShadow, getSecondaryBackground} from "../../styles/shared/MainStyles";
import React from "react";
import mainStyles from '../../styles/shared/Main.module.css'
import {CakeRounded} from "@material-ui/icons";

export default function AvatarLayout(props) {
    // const timeBetween = props.lastActivity !== null ? ((Date.now() - props.lastActivity) / 3600000) : null
    // const getColor = () => {
    //     let response = null
    //     switch (true){
    //         case timeBetween <= .5: {
    //             response = '#249a44'
    //             break
    //         }
    //         case timeBetween > .5 && timeBetween <= 24: {
    //             response = '#f2ac04'
    //             break
    //         }
    //         case timeBetween > 24: {
    //             response = '#e62214'
    //             break
    //         }
    //         default:
    //             break
    //     }
    //     return response
    // }
    return (
        <div key={props.key}>
            <Avatar src={props.image !== undefined ? ImageHost() + props.image : null}
                    style={{
                        ...{height: '90px', width: '90px'},
                        ...getBoxShadow({dark: props.dark})
                    }}/>
            {props.cakeDay === true ?
                <div className={mainStyles.displayInlineCenter} style={{...{width: '32px', height: '32px', position: 'absolute', bottom: '7%', left:'10%', borderRadius: '16px'},...getBorder({dark: props.dark}), ...getSecondaryBackground({dark: props.dark})}}>
                    {/*<p className={mainStyles.tertiaryParagraph} style={{color: getColor()}}>{~~timeBetween}</p>*/}
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