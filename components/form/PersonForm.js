import React from 'react'
import Cookies from "universal-cookie/lib";
import {Avatar} from "@material-ui/core";
import styles from '../../styles/Form.module.css'
import axios from "axios";
import Host from "../../config/Host";

const cookies = new Cookies()

export default class PersonForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            canEdit: false,
            canAskForUpdate: parseInt(cookies.get('id')) === props.id,
            person: null
        }
    }

    componentDidMount() {
        this.fetchData().catch(e => console.log(e))
        this.fetchAccess().catch(e => console.log(e))
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

    async fetchAccess(){
        try {
            await axios({
                method: 'get',
                url: Host + 'access',
                headers:{'authorization': cookies.get('jwt')}
            }).then(res => {
                this.setState({
                    canEdit: res.data
                })
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }



    render() {
        return(
            <div className={styles.container}>
                <div className={styles.title_container}>
                    <Avatar src={this.props.pic} alt={this.props.name}/>
                    <p>{this.props.name}</p>
                </div>
                <div>

                </div>
            </div>
        )
    }
}