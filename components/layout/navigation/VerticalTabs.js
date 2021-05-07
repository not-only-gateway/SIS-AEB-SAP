import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";
import mainStyles from '../../../styles/shared/Main.module.css'
import {useEffect, useState} from "react";

export default function VerticalTabs(props) {
    const [openTab, setOpenTab] = useState({
        key: 0,
        index: 0
    })

    const [tabsHeight, setTabsHeight] = useState(null)
    const [contentHeight, setContentHeight] = useState(null)
    useEffect(() => {
        if(tabsHeight === null)
            setTabsHeight(document.getElementById("vertical-tab-component").offsetHeight)

        setContentHeight(document.getElementById("content-container").offsetHeight)
    }, [openTab])
    return (
        <div className={mainStyles.displayInlineSpaced} style={{width: '100%', alignContent: 'flex-start', position: 'relative'}}>
            <div key={'vertical-tab-component'} id={'vertical-tab-component'}
                 style={{
                     display: 'grid',
                     gap: '20px',
                     width: 'fit-content',
                     marginBottom: 'auto'
                 }}>
                {props.buttons.map((button, index) => {
                        if (button !== null)
                            return (
                                <Button disabled={button.disabled} key={button.key} style={{
                                    borderRadius: ' 8px 0  0 8px ',
                                    backgroundColor: openTab.key === button.key ? 'white' : 'unset',
                                    transition: '.2s',
                                    textTransform: 'capitalize',
                                    paddingRight: '32px',
                                    paddingLeft: '32px',
                                    color: 'black',
                                    height: '50px',
                                    boxShadow: openTab.key === button.key ? 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' : 'unset'
                                }}
                                        onClick={() => setOpenTab({
                                            key:button.key,
                                            index: index
                                        })}>
                                    {button.value}
                                </Button>
                            )
                        else
                            return null
                    }
                )}

            </div>
            {!props.tabs ? null : props.tabs.map(tab => (
                tab.key === openTab.key ?
                    <div style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: '100%',
                        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                        borderRadius: ((contentHeight !== tabsHeight &&  openTab.index > 0) || (openTab.index > 0 && openTab.index < props.buttons.length - 1)  ? '8px' : openTab.index === 0 ? '0 8px  8px 8px' : '8px 8px  8px 0' )
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