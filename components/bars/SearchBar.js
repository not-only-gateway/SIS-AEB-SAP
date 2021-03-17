import {Avatar, Button, IconButton, InputBase, Paper} from "@material-ui/core";
import {SearchRounded} from "@material-ui/icons";
import Cookies from "universal-cookie/lib";
import styles from '../../styles/bar/Bar.module.css'
import {useEffect, useState} from "react";
import {getLogo} from "../../config/Theme";

const cookies = new Cookies()

export default function SearchBarComponent(dark){
    // const [logo, setLogo] = useState(null)
    // useEffect((() => {
    //     setLogo()
    // }), [])

    const paperStyle = {
        backgroundColor: dark ? '#272e38' : '#f7f8fa',
        height:'6vh',
        boxShadow: 'none',
        width: '100%',
        gridColumn: '4',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-between',
        borderRadius:'8px',
    }
    const inputStyle = {
        width: '90%',
        color: dark ? 'white' : null
    }
    const secondaryButtonStyle = {
        textTransform: 'none',
        fontSize: '.85rem',
        color: dark ? 'white' : 'black',
        height: 'fit-content',
        fontWeight: '400'
    }
    const logoStyle = {
        width:'7vw',
        margin:'auto'
    }
    const [searchValue, setSearchValue] = useState(null)

    return (
        <div className={styles.top_bar_container} style={{color: dark ? 'white' : '#111111'}}>
            <div style={{gridColumn: 1, display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <img style={logoStyle} src={getLogo(dark)} alt={"aeb"}/>
            </div>
           <div style={{gridColumn: 2, display: 'flex', justifyContent:'space-evenly'}}>
               <Button style={secondaryButtonStyle}>Help</Button>
               <Button style={secondaryButtonStyle}>About</Button>
           </div>
            <Paper component="form" style={paperStyle}>
                <IconButton aria-label="search" disabled={searchValue === null || searchValue === ''}>
                    <SearchRounded style={{color: dark ? 'white' : null}}/>
                </IconButton>
                <InputBase
                    style={inputStyle}
                    placeholder={"Search"}
                    onChange={event => setSearchValue(event.target.value)}
                    onKeyDown={key => (key.key === "Enter"? this.setState({redirect: true}): console.log("."))}
                />
            </Paper>

            <div className={styles.bar_profile_container}>
                {typeof cookies.get('jwt') === 'undefined' ?
                    null
                    :
                    (
                        <div>
                            <p style={{
                                marginRight: '1vw',
                                fontSize: '16px',
                                lineBreak: 'auto',
                                textAlign: 'right',
                                textTransform: 'capitalize'
                            }}>INCIsdasdasdasdasdasdasdasdasd</p>
                            <Avatar
                                style={{height: '45px', marginRight: '1%', width: '45px'}}
                                // src={this.state.profile.pic}
                                alt="user"
                            />
                        </div>
                    )
                }
            </div>


        </div>
    )
}