import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";
import mainStyles from "../../styles/shared/Main.module.css";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import styles from '../../styles/Extensions.module.css'
import getComponentLanguage from "../../utils/shared/GetComponentLanguage";
import Extension from "./Extension";


export default function Extensions(props) {
    const [lang, setLang] = useState(null)
    const [editable, setEditable] = useState(null)
    useEffect(() => {
        if (lang === null)
            setLang(getComponentLanguage({locale: props.locale, component: 'extension'}))
        if (editable === null){
            const accessProfileSession = sessionStorage.getItem('accessProfile')
            if(accessProfileSession !== null)
                setEditable(JSON.parse(accessProfileSession).can_update_person || JSON.parse(accessProfileSession).can_manage_membership)
            else
                setEditable(false)
        }

    }, [])

    if (props.data.length > 0 && lang !== null)
        return (
            <div className={styles.fullWidth} >
                <InfiniteScroll
                    dataLength={props.data.length}
                    next={() => props.fetchData(0)}
                    hasMore={props.lastFetchedSize === 15}
                    inverse={false}
                    scrollableTarget="scrollableDiv"
                    loader={<Skeleton variant={'rect'} width={'100%'} style={{borderRadius: '8px'}}
                                      height={'7vh'}/>}
                    style={{
                        overflow: 'visible'
                    }}
                    endMessage={
                        <div className={styles.fullWidth}>
                            <h5
                               style={{textAlign: 'center', color: '#555555'}}>{props.end}</h5>
                        </div>
                    }
                >
                    <div className={styles.extensionsList}>
                        {props.data.map((member, index) =>
                            <div  style={{width: 'calc(20% - 13px)'}} key={member.member.id + ' - ' + member.person.id}>
                            <Extension
                                lang={lang} index={index} member={member.member} redirect={id => props.redirect(id)}
                                unit={member.unit} commissionedRole={member.commissioned_role}
                                effectiveRole={member.effective_role} senior={member.senior} linkage={member.linkage}
                                person={member.person} editable={editable} locale={props.locale}
                            />
                            </div>
                        )}
                    </div>
                </InfiniteScroll>
            </div>
        )
    else
        return (

                <div className={styles.fullWidth}>
                    <h5 className={mainStyles.secondaryParagraph}
                       style={{textAlign: 'center', color: '#555555'}}>{props.nothingFound}</h5>
                </div>
                // <p className={styles.nothingFoundParagraph}>{props.nothingFound}</p>
            // </div>
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
