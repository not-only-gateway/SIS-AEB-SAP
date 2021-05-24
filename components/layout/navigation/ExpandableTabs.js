import PropTypes from 'prop-types'
import Button from "../../modules/inputs/Button";
import {useState} from "react";
import styles from '../../../styles/Navigation.module.css'

export default function ExpandableTabs(props) {
    const [extendedTab, setExtendedTab] = useState(undefined)

    return (
        <div key={'tab-component'}
             className={styles.expandableTabsContainer}
             style={{
                 marginTop: props.noMargin ? 0 : '16px',
             }}>
            {props.buttons.map((button) => {
                    if (button !== null)
                        return (
                            <div style={{
                                display: 'flex',
                                backgroundColor: extendedTab === button.mainButton.key ? '#f4f5fa' : 'transparent',
                                padding: extendedTab !== undefined ? '3px' : '3px 0 3px 0 ',
                                gap: '8px',
                                borderRadius: extendedTab !== undefined ? '32px' : '0',
                                border: extendedTab === button.mainButton.key ? '#ecedf2 .7px solid' : 'transparent .7px solid'
                            }}>
                                <Button
                                    content={button.mainButton.value} handleClick={() => {
                                    if (extendedTab !== undefined && button.mainButton.key === extendedTab)
                                        setExtendedTab(undefined)
                                    else
                                        setExtendedTab(button.mainButton.key)
                                }}
                                    elevation={button.mainButton.key === extendedTab} disabled={false}
                                    padding={'8px 32px 8px 32px'}
                                    variant={ 'rounded'} width={'auto'}
                                    hoverHighlight={button.mainButton.key !== extendedTab && props.openTab.mainTab !== button.mainButton.key}
                                    border={'transparent 1px solid'}
                                    backgroundColor={props.openTab.mainTab === button.mainButton.key ? '#0095ff' : button.mainButton.key === extendedTab ? 'white' : 'unset'}
                                    fontColor={props.openTab.mainTab === button.mainButton.key ? 'white' :  '#222228'}
                                    paddingType={'long'}
                                />
                                {extendedTab === button.mainButton.key ? button.subButtons.map(subButton => (
                                    <div>
                                        <Button
                                            content={subButton.value} handleClick={() => props.setOpenTab({
                                            mainTab: button.mainButton.key,
                                            subTab: subButton.key
                                        })}
                                            elevation={props.openTab ? (subButton.key === props.openTab.subTab && button.mainButton.key === props.openTab.mainTab) : false}
                                            disabled={subButton.disabled} padding={'8px 32px 8px 32px'}
                                            variant={'rounded'} width={'auto'}
                                            hoverHighlight={subButton.key !== props.openTab.subTab}
                                            border={props.openTab && subButton.key === props.openTab.subTab && button.mainButton.key === props.openTab.mainTab ? '#ecedf2 1px solid' : 'transparent 1px solid'}
                                            colorVariant={'default'}
                                            backgroundColor={props.openTab && subButton.key === props.openTab.subTab && button.mainButton.key === props.openTab.mainTab ? 'white' : 'transparent'}
                                            fontColor={ '#262626'}
                                            paddingType={'long'}
                                        />
                                    </div>
                                )) : null}
                            </div>
                        )
                    else
                        return null
                }
            )}
        </div>
    )
}

ExpandableTabs.proptypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            mainButton: PropTypes.shape(
                {
                    key: PropTypes.number,
                    value: PropTypes.any
                }
            ),
            subButtons: PropTypes.arrayOf(
                PropTypes.shape(
                    {
                        key: PropTypes.number,
                        value: PropTypes.any
                    }
                )
            )
        })
    ),
    setOpenTab: PropTypes.func,
    openTab: PropTypes.object,
    noMargin: PropTypes.bool
}