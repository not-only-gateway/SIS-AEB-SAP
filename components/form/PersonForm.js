import React from 'react'
import Cookies from "universal-cookie/lib";
import {Avatar, Button, IconButton, InputBase, Paper} from "@material-ui/core";
import styles from '../../styles/form/Form.module.css'
import axios from "axios";
import Host from "../../config/Host";
import {searchFieldStyle} from "../../styles/bar/BarMaterialStyles";
import {SearchRounded} from "@material-ui/icons";
import {inputStyle} from "../../styles/auth/AuthMaterialStyles";
import {paperStyle} from "../../styles/form/FormMaterialStyles";
import PersonFormFields from "./PersonFormFields";

const cookies = new Cookies()

export default class PersonForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            profile: null,
            page: 0,
            hasMadeChanges: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.fetchData().catch(e => console.log(e))
    }

    async fetchData(){
        try {
            await axios({
                method: 'get',
                url: Host + 'person',
                headers:{'authorization': cookies.get('jwt')},
                params: {
                    id: this.props.id
                }
            }).then(res => {
                this.setState({
                    profile: res.data
                })
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
        if(!this.state.hasMadeChanges)
            this.setState({
                hasMadeChanges: true
            })
    }

    render() {
        return(
            <div className={styles.container}>
                <div className={styles.title_container}>
                    <Avatar src={'https://rollingstone.uol.com.br/media/_versions/marcos_jeeves_teaser_reprod_widemd.jpg'} style={{width: '8vh', height: '8vh'}}/>
                    {/*<Avatar src={this.props.pic} alt={this.state.profile.name}/>*/}
                    {/*<p>{this.state.profile.name}</p>*/}
                    <p style={{color: (this.props.dark? 'white': 'black'), fontSize: '1.2rem', fontWeight: 440}}>Gustavo Roque</p>
                </div>
                <div className={styles.form_rows_container}>
                    <div>
                        {this.state.page === 0 ?
                            null
                            :
                            <Button style={{color: (this.props.dark? 'white': 'black'), float: 'left'}} onClick={() => this.setState({page: this.state.page-1})} >Prev</Button>
                        }
                        {this.state.page === 2 ?
                            null
                            :
                            <Button style={{color: (this.props.dark? 'white': 'black'), float: 'right'}} onClick={() => this.setState({page: this.state.page+1})} disabled={this.state.page === 2}>Next</Button>
                        }
                    </div>
                    <PersonFormFields page={this.state.page} handleChange={this.handleChange} dark={this.props.dark}/>
                    <div className={styles.form_row}>
                        <Button disabled={!this.state.hasMadeChanges}>Save</Button>
                        <Button disabled={!this.state.hasMadeChanges}>Discard</Button>
                    </div>
                </div>
            </div>
        )
    }
}