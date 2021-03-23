import styles from '../../styles/Layout.module.css'
import {Avatar, Button, createMuiTheme, Modal, ThemeProvider} from "@material-ui/core";
import React from 'react'
import {CakeRounded} from "@material-ui/icons";
import Profile from "../../pages/profile";
import axios from "axios";
import Host from "../../config/Host";
import Cookies from "universal-cookie/lib";
import Person from "../profile/Person";
import Link from 'next/link'
import shared from '../../styles/Shared.module.css'
import {personaContainerStyle} from "../../styles/persona/PersonaMaterialStyles";

const cookies = new Cookies()

export default class Persona extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            modalOpen: false,
            canEdit: false,
            ownProfile: false,
        }
    }

    componentDidMount() {
        this.setState({
            canEdit: (localStorage.getItem('profile') !== null && (JSON.parse(localStorage.getItem('profile')).is_administrator === true)),
            ownProfile: parseInt(cookies.get('id')) === this.props.id
        })
    }

    renderModal(){

        if(this.state.modalOpen){
            return(
                <Modal open={this.state.modalOpen} onClose={() => this.setState({modalOpen: false})}>
                    <div className={styles.modal_container} style={{backgroundColor: !this.props.dark ? 'white' : '#303741'}}>
                        <Person dark={this.props.dark}
                                name={this.props.name}
                                email={this.props.email}
                                pic={this.props.pic}
                                phone={this.props.phone}
                        />
                    </div>
                </Modal>
            )
        }
    }

    renderContent(){
        return (
            <>
                <Avatar src={this.props.pic} alt={this.props.name} style={{marginLeft: '10px', height: '7vh', width: '7vh'}}/>
                <div className={styles.persona_fields_container}>
                    {((new Date(this.props.birth)).getDay() === (new Date).getDay() && (new Date(this.props.birth)).getMonth() === (new Date).getMonth()) ? <CakeRounded style={{color: '#f54269', marginRight: '10px', fontSize: '1.8rem'}}/> : null }
                    <p style={{fontSize: '1.02rem', fontWeight:435, color: (this.props.dark ? 'white': 'black')}}>{this.props.name}</p>
                </div>

                <p style={{fontSize: '.9rem', fontWeight:400, color: (this.props.dark ? '#e2e2e2': '#111111')}}>{this.props.email}</p>
                <p style={{fontSize: '.9rem', fontWeight:400, color: (this.props.dark ? '#e2e2e2': '#111111')}}>{this.props.phone.substr(this.props.phone.length-4, this.props.phone.length)}</p> {/*last 4 digits*/}
            </>
        )
    }

    render(){
        return (
            <div className={styles.persona_container}  key={this.props.id}>
                {this.renderModal()}
                <ThemeProvider theme={createMuiTheme({
                    palette: {
                        type: this.props.dark ? "dark" : "light"
                    }
                })}>
                    {cookies.get('adm_token') === undefined || this.state.ownProfile ?

                            <>
                                <Link href={{pathname: '/profile', query: { id: this.props.id}}}>
                                    <Button style={personaContainerStyle}>
                                        {this.renderContent()}
                                    </Button>
                                </Link>
                                <Button variant={'outlined'} style={{color: (this.props.dark ? '#e2e2e2': '#111111'), borderRadius: '8px',    border : (this.props.dark ? '#262d37 2px solid':'#f4f8fb 2px solid')}}>
                                    CTIC
                                </Button>
                            </>

                        :
                        <>
                            <Button onClick={() => this.setState({modalOpen: true})} style={personaContainerStyle}>
                                {this.renderContent()}
                            </Button>
                            <Button variant={'outlined'} style={{color: (this.props.dark ? '#e2e2e2': '#111111'), borderRadius: '8px',    border : (this.props.dark ? '#262d37 2px solid':'#f4f8fb 2px solid')}}>
                                CTIC
                            </Button>
                        </>

                    }
                </ThemeProvider>
            </div>
        )
    }
}