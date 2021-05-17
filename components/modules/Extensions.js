import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";
import mainStyles from "../../styles/shared/Main.module.css";
import {getTertiaryColor} from "../../styles/shared/MainStyles";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import styles from '../../styles/Extensions.module.css'
import getComponentLanguage from "../../utils/shared/GetComponentLanguage";
import ProfilePersona from "../elements/ProfilePersona";

export default function Extensions(props) {
    const currentDate = new Date()
    const [hoveredExtension, setHoveredExtension] = useState(undefined)
    const [lang, setLang] = useState(null)

    const headerStyle = {
        marginTop: "0",
        marginBottom: 0,
        marginRight: '5px',
        color: '#262626',
        transition: '300ms ease-in-out'
    }
    const secondaryHeaderStyle = {
        color: '#555555',
        marginBottom: 0,
        marginTop: 0,
        transition: '300ms ease-in-out'
    }

    useEffect(() => {
        if (lang === null)
            setLang(getComponentLanguage({locale: props.locale, component: 'extension'}))
    }, [])

    if (props.data.length > 0 && lang !== null)
        return (
            <div className={styles.fullWidth}>
                <InfiniteScroll
                    dataLength={props.data.length}
                    next={() => props.fetchData(0)}
                    hasMore={props.lastFetchedSize === 15}
                    inverse={false}
                    scrollableTarget="scrollableDiv"
                    loader={<Skeleton variant={'rect'} width={'100%'} style={{borderRadius: '8px'}}
                                      height={'7vh'}/>}
                    endMessage={
                        <div className={styles.fullWidth}>
                            <p className={mainStyles.secondaryParagraph}
                               style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: false})}}>{props.end}</p>
                        </div>
                    }
                >
                    <div className={styles.extensionsList}>
                        {props.data.map((member, index) =>
                            <button key={member.member.id} onClick={() => props.redirect(member.member.id)}
                                    onMouseEnter={() => setHoveredExtension(member.member.id)}
                                    onMouseLeave={() => setHoveredExtension(undefined)}
                                    className={styles.extensionButton}
                                    style={{
                                        animationDelay: index * 200 + 'ms',
                                        border: member.member.id === hoveredExtension ? '#0095ff .7px solid' : '#ecedf2 .7px solid',
                                        boxShadow: member.member.id === hoveredExtension ? 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' : 'unset'
                                    }}>
                                <div className={mainStyles.rowContainer} style={{height: 'auto'}}>
                                    <div
                                        className={[mainStyles.displayInlineStart, mainStyles.overflowEllipsis].join(' ')}
                                    >
                                        <ProfilePersona dark={false} key={member.member.id}
                                                        image={member.member.image} size={'65px'} variant={'rounded'}
                                                        elevation={member.member.id === hoveredExtension}
                                                        cakeDay={((new Date(member.member.birth)).getDay() === currentDate.getDay() && (new Date(member.member.birth)).getMonth() === currentDate.getMonth())}/>
                                        <p className={mainStyles.secondaryParagraph}
                                           style={{
                                               ...headerStyle, ...{
                                                   marginLeft: '5px',
                                                   textTransform: 'capitalize'
                                               }
                                           }}>{member.member.name}</p>
                                    </div>
                                    <div
                                        className={mainStyles.displayInlineSpaced}
                                        style={getTertiaryColor({dark: false})}>
                                        <h5 style={headerStyle}>Email:</h5>
                                        <h5 style={secondaryHeaderStyle}>{member.member.corporate_email}</h5>

                                    </div>
                                    <div
                                        className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter].join(' ')}
                                        style={getTertiaryColor({dark: false})}>
                                        <h5 style={headerStyle}>{lang.extension}:</h5>
                                        <h5 style={secondaryHeaderStyle}>{member.member.extension}</h5>
                                    </div>
                                    {member.unit === undefined || member.unit === null ?
                                        null
                                        :
                                        <div
                                            className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter].join(' ')}
                                            style={getTertiaryColor({dark: false})}>
                                            <h5 style={headerStyle}>{lang.unit}:</h5>
                                            <h5 style={secondaryHeaderStyle}>{member.unit.acronym}</h5>

                                        </div>
                                    }

                                </div>
                            </button>
                        )}
                    </div>
                </InfiniteScroll>
            </div>
        )
    else
        return (
            <div className={styles.nothingFoundContainer}>
                <p className={styles.nothingFoundParagraph}>{props.nothingFound}</p>
            </div>
        )
}

Extensions.propTypes = {
    data: PropTypes.array,
    nothingFound: PropTypes.string,
    redirect: PropTypes.func,
    fetchData: PropTypes.func,
    lastFetchedSize: PropTypes.number,
    end: PropTypes.string,
    locale: PropTypes.string
}
