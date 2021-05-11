import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";
import mainStyles from "../../styles/shared/Main.module.css";
import {getTertiaryColor} from "../../styles/shared/MainStyles";
import Extension from "../templates/list/Extension";
import React from "react";
import PropTypes from 'prop-types'
import styles from '../../styles/Extensions.module.css'
export default function Extensions(props) {
    if (props.data.length > 0)
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
                            <Extension
                                data={member}
                                index={index}
                                redirect={id => {
                                    props.redirect(id)
                                }}
                                locale={props.locale}

                            />
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
