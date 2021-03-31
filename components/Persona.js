import styles from '../styles/index/Index.module.css'
import {Avatar, Button, Modal} from "@material-ui/core";
import React from 'react'
import {CakeRounded} from "@material-ui/icons";
import Cookies from "universal-cookie/lib";
import PersonProfile from "./profile/PersonProfile";
import Link from 'next/link'

const cookies = new Cookies()

export default class Persona extends React.Component {
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
                            profile={this.props.person.profile}
                            collaboration={this.props.person.collaboration}
                        />
                    </div>
                </Modal>
            )
        }
    }

    renderContent() {
        const borderBottom = {borderBottom: !this.props.dark ? '#e2e2e2 1px solid' : '#777777 1px solid'}
        const secondaryField = {
            fontSize: '.9rem',
            fontWeight: 400,
            color: (this.props.dark ? '#e2e2e2' : '#111111')
        }
        return (
            <div className={styles.persona_fields_container}>
                <div className={styles.persona_title} style={borderBottom}>
                    <Avatar src={this.props.person.profile.pic} alt={this.props.person.profile.name}
                            style={{height: '70px', width: '70px'}}/>
                    <p style={{
                        fontSize: '1rem',
                        fontWeight: 445,
                        color: (this.props.dark ? 'white' : 'black')
                    }}>{this.props.person.profile.name}</p>
                    {((new Date(this.props.person.profile.birth)).getDay() !== (new Date).getDay() && (new Date(this.props.person.profile.birth)).getMonth() === (new Date).getMonth()) ?
                        <CakeRounded style={{color: '#f54269', fontSize: '1.8rem'}}/>
                        :
                        null
                    }
                </div>
                <p style={secondaryField}>{this.props.person.profile.corporate_email}</p>
                <p style={secondaryField}>{this.props.person.profile.extension}</p> {/*last 4 digits*/}
            </div>
        )
    }

    render() {
        const buttonStyle = {
            height: '100%',
            width: '100%',
            textTransform: 'none',
            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px',

        }
        const containerDarkStyle = {
            backgroundColor: '#3b424c',
            borderRadius: '8px',
        }
        const containerLightStyle = {
            borderRadius: '8px',
            border: '#e2e2e2 1px solid'
        }

        return (
            <div className={styles.persona_container} key={this.props.person.profile.id}
                 style={this.props.dark ? containerDarkStyle : containerLightStyle}>
                {this.renderModal()}
                {this.props.canEdit ?
                    <Link href={{pathname: '/person', query: {id: this.props.person.profile.id}}}>
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
                <div style={{width: '100%', borderTop: !this.props.dark ? '#e2e2e2 1px solid' : '#777777 1px solid'}}>
                    <Button style={{
                        height: 'fit-content', borderBottomRightRadius: '8px',
                        borderBottomLeftRadius: '8px', width: '100%'
                    }}
                            disabled={true}
                    >

                        {this.props.person.collaboration.unity.acronym} - {this.props.person.collaboration.unity.name}
                    </Button>
                </div>
            </div>

        )
    }

}