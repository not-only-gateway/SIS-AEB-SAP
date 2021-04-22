import PropTypes from 'prop-types'
import {Avatar, createMuiTheme, ThemeProvider} from "@material-ui/core";
import ImageHost from "../../utils/shared/ImageHost";
import {getBorder, getBoxShadow, getPrimaryBackground} from "../../styles/shared/MainStyles";
import React from "react";
import mainStyles from '../../styles/shared/Main.module.css'
import {CakeRounded} from "@material-ui/icons";

export default function AvatarLayout(props) {

    return (
        <div key={props.key}>
            <ThemeProvider theme={createMuiTheme({
                palette: {
                    type: "light"
                }
            })}>
                <Avatar src={props.image !== undefined ? ImageHost() + props.image : null}
                        style={{
                            ...{height: '70px', width: '70px'},
                            ...getBoxShadow({dark: props.dark})
                        }}/>
            </ThemeProvider>
            {props.cakeDay === true ?
                <div className={mainStyles.displayInlineCenter} style={{
                    width: '32px',
                    height: '32px',
                    position: 'absolute',
                    bottom: '2%',
                    left: '0%',
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

AvatarLayout.propTypes = {
    dark: PropTypes.bool,
    image: PropTypes.string,
    cakeDay: PropTypes.bool,
    key: PropTypes.number,
}