import PropTypes from 'prop-types'
import styles from "../styles/Footer.module.css";
import {AddRounded, ListRounded} from "@material-ui/icons";
import {useState} from "react";

export default function Pages(props) {
    const [selected, setSelected] = useState(undefined)
    return (
        <div className={styles.scaleContainer} style={{marginLeft: 0}}>
            <button
                className={styles.newPageButton}
                style={{borderRight: '#ecedf2 1px solid'}}
            >
                <ListRounded style={{fontSize: '1.7rem'}}/>
            </button>
            {props.data.pages.map((page, index) => (
                <div>
                    {selected === index ?
                        <input
                            className={[styles.pageButton, page.default ? styles.mainPage : ''].join(' ')}
                            onContextMenu={event => event.preventDefault()} value={page.title}/>
                        :
                        <div className={[styles.pageButton, page.default ? styles.mainPage : ''].join(' ')}
                             onDoubleClick={() => setSelected(index)}>
                            {page.title}
                        </div>
                    }

                </div>
            ))
            }
            <button
                className={styles.newPageButton}
                style={{display: props.data.pages.length < 5 ? undefined : 'none'}}
                onClick={() => {
                    let newPages = [...props.data.pages]
                    newPages.push({
                        title: 'Página ' + (props.data.pages.length + 1),
                        nodes: [],
                        links: [],
                        default: false
                    })
                    props.setData({
                        ...props.data,
                        pages: newPages
                    })
                }}>
                <AddRounded style={{fontSize: '1.5rem'}}/>
            </button>
        </div>
    )
}

Pages.propTypes = {
        data: PropTypes.object,
        setData:PropTypes.func
}