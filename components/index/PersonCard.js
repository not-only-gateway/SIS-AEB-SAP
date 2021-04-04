import styles from '../../styles/index/Index.module.css'
import {Avatar, Button, Modal} from "@material-ui/core";
import React, {useState} from 'react'
import {CakeRounded} from "@material-ui/icons";
import Cookies from "universal-cookie/lib";
import ProfileCard from "./ProfileCard";
import Link from 'next/link'
import PropTypes from 'prop-types'

const cookies = new Cookies()

export default function PersonCard(props) {

    const [modal, setModal] = useState(false)

    function renderModal() {

        if (modal) {
            return (
                <Modal open={modal} onClose={() => setModal(false)}>
                    <div className={styles.modal_container}
                         style={{backgroundColor: !props.dark ? 'white' : '#303741'}}>
                        <ProfileCard
                            dark={props.dark}
                            id={props.id}
                            profile={props.profile}
                            collaboration={props.collaboration}
                        />
                    </div>
                </Modal>
            )
        }
    }

    function renderContent() {
        const borderBottom = {borderBottom: !props.dark ? '#e2e2e2 1px solid' : '#777777 1px solid'}
        const secondaryField = {
            fontSize: '.9rem',
            fontWeight: 400,
            color: (props.dark ? '#e2e2e2' : '#111111')
        }
        return (
            <div className={styles.persona_fields_container}>
                <div className={styles.persona_title} style={borderBottom}>
                    <Avatar src={props.profile.pic} alt={props.profile.name}
                            style={{height: '70px', width: '70px'}}/>
                    <p style={{
                        fontSize: '1rem',
                        fontWeight: 445,
                        color: (props.dark ? 'white' : 'black')
                    }}>{props.profile.name}</p>
                    {((new Date(props.profile.birth)).getDay() !== (new Date).getDay() && (new Date(props.profile.birth)).getMonth() === (new Date).getMonth()) ?
                        <CakeRounded style={{color: '#f54269', fontSize: '1.8rem'}}/>
                        :
                        null
                    }
                </div>
                <p style={secondaryField}>{props.profile.corporate_email}</p>
                <p style={secondaryField}>{props.profile.extension}</p> {/*last 4 digits*/}
            </div>
        )
    }

    return (

        <div className={styles.persona_container} key={props.profile.id}
             style={{
                 backgroundColor: props.dark ? '#3b424c' : null,
                 border: props.collaboration !== undefined && props.collaboration !== null ? '#39adf6 2px solid' : '#f54269 2px solid',
                 borderRadius: '8px'
             }}>
            {renderModal()}
            {props.canEdit ?
                <Link href={{pathname: '/person', query: {id: props.profile.id}}}>
                    <Button style={{
                        height: props.collaboration !== undefined && props.collaboration !== null ? '25vh': '29vh' ,
                        width: '100%',
                        textTransform: 'none',
                        borderTopRightRadius: '8px',
                        borderTopLeftRadius: '8px',
                    }}>
                        {renderContent()}
                    </Button>
                </Link>
                :
                < >
                    <Button onClick={() => setModal(true)} style={{
                        height: props.collaboration !== undefined && props.collaboration !== null ? '25vh': '29vh' ,
                        width: '100%',
                        textTransform: 'none',
                        borderTopRightRadius: '8px',
                        borderTopLeftRadius: '8px',
                    }}>
                        {renderContent()}
                    </Button>
                </>
            }
            {props.collaboration !== undefined && props.collaboration !== null ?

                <Button style={{
                    borderTop: !props.dark ? '#e2e2e2 1px solid' : '#777777 1px solid',
                    borderBottomRightRadius: '8px',
                    borderBottomLeftRadius: '8px', width: '100%'
                }}
                        disabled={true}
                >

                    {props.collaboration.unity.acronym} - {props.collaboration.unity.name}
                </Button>
                : null
            }

        </div>

    )
}
PersonCard.proptypes = {
    dark: PropTypes.bool,
    profile: PropTypes.object,
    collaboration: PropTypes.object,
    id: PropTypes.string
}