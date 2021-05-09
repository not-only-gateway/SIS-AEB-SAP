import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";
import mainStyles from '../../../styles/shared/Main.module.css'
import {useEffect, useState} from "react";

export default function VerticalTabs(props) {
    const [openTab, setOpenTab] = useState({
        key: 0,
        index: 0
    })

    const [marginTop, setMarginTop] = useState(null)

    useEffect(() => {
        setMarginTop(window.scrollY + document.getElementById('vertical-tab-component').getBoundingClientRect().top)
    }, [openTab])
    return (
        <div className={mainStyles.displayInlineSpaced}
             style={{
                 width: '100%',
                 alignContent: 'flex-start', gap: '20px'
             }}>
            <div key={'vertical-tab-component'} id={'vertical-tab-component'}
                 style={{
                     display: 'grid',
                     gap: '20px',
                     width: 'fit-content',
                     marginBottom: 'auto',
                     position: 'sticky',
                     top: marginTop + 'px',
                     backgroundColor: 'white',
                     borderRadius: '8px',
                     padding: '8px',
                     boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                     maxWidth: '20%'
                 }}>
                {props.buttons.map((button, index) => (
                    <Button
                        disabled={button.disabled} key={button.key} style={{
                        display: button ? 'flex' : 'none',
                        borderRadius: '32px',
                        backgroundColor: openTab.key === button.key ? '#0095ff' : 'unset',
                        transition: '300ms ease-in-out',
                        textTransform: 'capitalize',
                        paddingRight: '24px',
                        paddingLeft: '24px',
                        color: openTab.key === button.key ? 'white' : 'black',
                        justifyItems: 'center',
                        boxShadow: openTab.key === button.key ? 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' : 'unset'
                    }}
                        onClick={() => setOpenTab({
                            key: button.key,
                            index: index
                        })}>
                        {button.value}
                    </Button>


                ))}

            </div>
            {!props.tabs ? null : props.tabs.map(tab => (
                tab.key === openTab.key ?
                    <div className={mainStyles.displayInlineCenter} style={{
                        backgroundColor: 'white',
                        width: '100%',
                        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                        borderRadius: '8px',
                        padding: '32px',
                        marginBottom: '50px'
                    }} id={'content-container'}>
                        {tab.content}
                    </div>
                    :
                    null
            ))}
        </div>
    )
}
VerticalTabs.proptypes = {
    buttons: PropTypes.object,
    tabs: PropTypes.array
}