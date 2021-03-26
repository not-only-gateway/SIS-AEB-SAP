import styles from "../../../../styles/form/Form.module.css";
import {Button, TextField} from "@material-ui/core";
import React from "react";
import axios from "axios";
import Host from "../../../../config/Host";
import Cookies from "universal-cookie/lib";
import {Skeleton} from "@material-ui/lab";

const cookies = new Cookies()

export default class ContactForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email: null,
            emailAlt: null,
            phone: null,
            phoneAlt: null,
            changed: false,
            loading: true
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.fetchData().catch(error => console.log(error))
    }

    async fetchData() {
        try {
            await axios({
                method: 'get',
                url: Host() + 'person/contact',
                headers: {'authorization': cookies.get('jwt')},
                params: {
                    id: this.props.id
                }
            }).then(res => {
                this.setState({
                    email: res.data.email,
                    emailAlt: res.data.email_alt,
                    phone: res.data.phone,
                    phoneAlt: res.data.phone_alt
                })
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
        this.setState({loading: false})
    }

    async saveChanges(){
        try {
            await axios({
                method: 'patch',
                url: Host() + 'person/contact',
                headers: {'authorization': cookies.get('jwt')},
                data: {
                    id: this.props.id,
                    email: this.state.email,
                    email_alt: this.state.emailAlt,
                    phone: this.state.phone,
                    phone_alt: this.state.phoneAlt
                }
            }).then(() => {
                this.setState({changed: false})
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,

        })
        if(!this.state.changed)
            this.setState({
                changed: true
            })
    }

    render() {
        if(!this.state.loading)
            return (
                <div className={styles.field_set_container}
                     style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                    <legend>
                        <p style={{fontSize: '1.2rem', fontWeight: 450}}>Contact</p>
                    </legend>

                    <div className={styles.form_row}>
                        <TextField disabled={this.props.disabled} label={'Email'} value={this.state.email}
                                   variant={"outlined"} style={this.props.mediumContainer} name='email' onChange={this.handleChange} required/>
                        <TextField disabled={this.props.disabled} label={'Alt Email'} value={this.state.emailAlt}
                                   variant={"outlined"} style={this.props.mediumContainer} name='emailAlt' onChange={this.handleChange}/>
                    </div>
                    <div className={styles.form_row}>
                        <TextField disabled={this.props.disabled} label={'Phone'} value={this.state.phone}
                                   variant={"outlined"} style={this.props.mediumContainer} name='phone' onChange={this.handleChange} required/>
                        <TextField disabled={this.props.disabled} label={'Alt Phone'} value={this.state.phoneAlt}
                                   variant={"outlined"} style={this.props.mediumContainer} name='phoneAlt' onChange={this.handleChange}/>
                    </div>
                    <div>
                        <Button style={{width: '100%'}} disabled={!this.state.changed} onClick={() => this.saveChanges()}>Save</Button>
                    </div>
                </div>

            )
        else
            return (
                <div className={styles.field_set_container}
                     style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                    <legend>
                        <p style={{fontSize: '1.2rem', fontWeight: 450}}>Contact</p>
                    </legend>
                    <Skeleton variant="rect" style={{borderRadius: '8px', marginBottom: '2vh', width: '45vw', height: '6vh', backgroundColor: this.props.dark ? '#3b424c' : '#f4f8fb'}}/>
                    <Skeleton variant="rect" style={{borderRadius: '8px', marginBottom: '2vh', width: '45vw', height: '6vh', backgroundColor: this.props.dark ? '#3b424c' : '#f4f8fb'}}/>
                    <Skeleton variant="rect" style={{borderRadius: '8px', marginBottom: '2vh', width: '45vw', height: '6vh', backgroundColor: this.props.dark ? '#3b424c' : '#f4f8fb'}}/>
                </div>
            )
    }
}