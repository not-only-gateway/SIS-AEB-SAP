import styles from '../styles/index/Index.module.css'
import {Avatar, Button, Modal} from "@material-ui/core";
import React from 'react'
import {CakeRounded} from "@material-ui/icons";
import Cookies from "universal-cookie/lib";
import PersonProfile from "./profile/PersonProfile";
import Link from 'next/link'

const cookies = new Cookies()

export default class PersonaComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
        }
    }


    renderModal() {

        if (this.state.modalOpen) {
            return (
                <Modal open={this.state.modalOpen} onClose={() => this.setState({modalOpen: false})}>
                    <div className={styles.modal_container}
                         style={{backgroundColor: !this.props.dark ? 'white' : '#303741'}}>
                        <PersonProfile
                            dark={this.props.dark}
                            id={this.props.id}
                        />
                    </div>
                </Modal>
            )
        }
    }

    renderContent() {
        const borderBottom = {borderBottom: this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid'}
        const secondaryField = {
            fontSize: '.9rem',
            fontWeight: 400,
            color: (this.props.dark ? '#e2e2e2' : '#111111')
        }
        return (
            <div className={styles.persona_fields_container}>
                <div className={styles.persona_title} style={borderBottom}>
                    <Avatar src={this.props.pic} alt={this.props.name}
                            style={{height: '70px', width: '70px'}}/>
                    <p style={{
                        fontSize: '1rem',
                        fontWeight: 445,
                        color: (this.props.dark ? 'white' : 'black')
                    }}>{this.props.name}</p>
                    {((new Date(this.props.birth)).getDay() !== (new Date).getDay() && (new Date(this.props.birth)).getMonth() === (new Date).getMonth()) ?
                        <CakeRounded style={{color: '#f54269', fontSize: '1.8rem'}}/>
                        :
                        null
                    }
                </div>
                <p style={secondaryField}>{this.props.email}</p>
                <p style={secondaryField}>{this.props.phone}</p> {/*last 4 digits*/}
            </div>
        )
    }

    render() {
        const buttonStyle = {
            height: '100%',
            width: '100%',
            textTransform: 'none',
            borderRadius: '8px',

        }
        const containerDarkStyle = {
            backgroundColor: '#3b424c',
            borderRadius: '8px'
        }
        const containerLightStyle = {
            borderRadius: '8px',
            border: '#f4f8fb 3px solid'
        }

        return (
            <div className={styles.persona_container} key={this.props.id}
                 style={this.props.dark ? containerDarkStyle : containerLightStyle}>
                {this.renderModal()}
                {this.props.canEdit || this.props.ownProfile ?
                    <Link href={{pathname: '/person', query: {id: this.props.id}}}>
                        <Button style={buttonStyle}>
                            {this.renderContent()}
                        </Button>
                    </Link>
                    :
                    < >
                        <Button onClick={() => this.setState({modalOpen: true})} style={buttonStyle}>
                            {this.renderContent()}
                        </Button>
                    </>
                }
                <Button variant={'outlined'} style={{height: 'fit-content', borderRadius: '8px'}}>
                    CTIC
                </Button>
            </div>

        )
    }

}