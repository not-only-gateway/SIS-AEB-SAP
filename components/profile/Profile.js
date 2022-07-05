import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles/Profile.module.css'
import {Avatar} from "@material-ui/core";
import {ExitToAppRounded} from "@material-ui/icons";
import {Button, Dropdown, ToolTip} from "mfc-core";

const profileTemplate = {
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string
}
export default function Profile(props) {

    return (
        <>
            {props.profile && Object.keys(props.profile).length > 0 ?
                <Dropdown
                    align={"top"} justify={'start'}
                    highlight={props.highlight} variant={'minimal-horizontal'}
                    className={styles.buttonContainer}
                    options={[
                        {

                            label: props.profile.name,
                            icon: <Avatar style={{width: '30px', height: '30px'}} src={props.profile.image}/>,
                            onClick: () => props.redirect(0)
                        },
                        {

                            label: 'Sair',
                            icon: <ExitToAppRounded/>,
                            onClick: () => props.redirect(1)
                        }
                    ]}

                >


                    <Avatar style={{width: '40px', height: '40px'}} src={props.profile.image}/>

                    <ToolTip content={props.profile.name} align={"middle"} justify={'end'}/>
                </Dropdown>

                :
                <Button
                    className={styles.buttonContainer}
                    onClick={() => props.openAuth()}
                    styles={{
                        justifyContent:  'center'
                    }}
                >
                    <span style={{transform: 'rotate(180deg)'}} className={'material-icons-round'}>
                        exit_to_app
                    </span>
                    <ToolTip content={'Entrar'} align={"middle"} justify={'end'}/>
                </Button>
            }
        </>
    )
}
Profile.propTypes = {
    highlight: PropTypes.bool,
    redirect: PropTypes.func.isRequired,
    profile: PropTypes.shape(profileTemplate),
    openAuth: PropTypes.func.isRequired
}
