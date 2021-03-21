import styles from '../../styles/Layout.module.css'
import {Avatar, Button, Modal} from "@material-ui/core";
import React from 'react'
import {CakeRounded} from "@material-ui/icons";
import PersonForm from "../form/PersonForm";
import axios from "axios";
import Host from "../../config/Host";
import Cookies from "universal-cookie/lib";
import Person from "../profile/Person";

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
                        {this.state.canEdit || this.state.ownProfile ? <PersonForm id={this.props.id} dark={this.props.dark}/> : <Person/>}
                    </div>
                </Modal>
            )
        }
    }
    
    render(){
        return (
            <div className={styles.persona_container}  key={this.props.id}>
                {this.renderModal()}
                <Button onClick={() => this.setState({modalOpen: true})} style={{width: '100%', height: '11vh', backgroundColor: 'transparent', display: 'flex', justifyContent: 'space-between', textTransform: 'none'}}>
                    <Avatar src={this.props.pic} alt={this.props.name} style={{marginLeft: '10px', height: '7vh', width: '7vh'}}/>
                    <div className={styles.persona_text_fields_container} style={{marginRight: '10px'}}>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            {((new Date(this.props.birth)).getDay() === (new Date).getDay() && (new Date(this.props.birth)).getMonth() === (new Date).getMonth()) ? <CakeRounded style={{color: '#f54269', marginRight: '10px', fontSize: '1.8rem'}}/> : null }
                            <p style={{fontSize: '1.02rem', fontWeight:435, color: (this.props.dark ? 'white': 'black')}}>{this.props.name}</p>
                        </div>

                        <p style={{fontSize: '.8rem', fontWeight:400, color: (this.props.dark ? '#e2e2e2': '#111111')}}>{this.props.email}</p>
                        <p style={{fontSize: '.8rem', fontWeight:400, color: (this.props.dark ? '#e2e2e2': '#111111')}}>{this.props.phone.substr(this.props.phone.length-4, this.props.phone.length)}</p> {/*last 4 digits*/}
                    </div>
                </Button>
            </div>
        )
    }
}