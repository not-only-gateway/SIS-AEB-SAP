import PropTypes from 'prop-types'
import Button from "../../modules/inputs/Button";
import React, {useState} from "react";
import styles from '../../../styles/Navigation.module.css'

export default function ExpandableTabs(props) {
    const [extendedTab, setExtendedTab] = useState(undefined)

    return (
        <div key={'tab-component'}
             className={styles.expandableTabsContainer}
             style={{
                 marginTop: props.noMargin ? 0 : '16px',
                 backgroundColor: extendedTab === undefined ? '#f4f5fa' : 'transparent',
                 padding: extendedTab === undefined ? ' 0 3px  0 3px' : "unset",
                 borderRadius: extendedTab === undefined ? '32px' : '0',
                 border: extendedTab === undefined ? '#ecedf2 .7px solid' : 'transparent .7px solid'
             }}>
            {props.buttons.map((button) => {
                    if (button !== null)
                        return (
                            <div key={button.mainButton.key + '-main_button_container'} style={{
                                display: 'flex',
                                backgroundColor: extendedTab === button.mainButton.key ? '#f4f5fa' : 'transparent',
                                padding: extendedTab !== undefined ? '3px' : '3px 0 3px 0 ',
                                gap: '8px',
                                borderRadius: extendedTab !== undefined ? '32px' : '0',
                                border: extendedTab === button.mainButton.key ? '#ecedf2 .7px solid' : 'transparent .7px solid'

                            }}>
                                <React.Fragment key={button.mainButton.key + '-main_button'}>

                                <Button
                                    content={button.mainButton.value}
                                    handleClick={() => {
                                        if (button.subButtons?.length > 0) {
                                            if (extendedTab !== undefined && button.mainButton.key === extendedTab)
                                                setExtendedTab(undefined)
                                            else
                                                setExtendedTab(button.mainButton.key)
                                        } else
                                            props.setOpenTab({
                                                mainTab: button.mainButton.key,
                                                subTab: undefined
                                            })
                                    }}
                                    elevation={button.mainButton.key === extendedTab} disabled={button.mainButton.disabled}
                                    padding={'8px 32px 8px 32px'}
                                    variant={'rounded'} width={'auto'}
                                    hoverHighlight={button.mainButton.key !== extendedTab && props.openTab.mainTab !== button.mainButton.key}
                                    border={'transparent 1px solid'}
                                    backgroundColor={props.openTab.mainTab === button.mainButton.key ? '#0095ff' : button.mainButton.key === extendedTab ? 'white' : 'unset'}
                                    fontColor={props.openTab.mainTab === button.mainButton.key ? 'white' : '#222228'}
                                    paddingType={'long'}
                                />
                                </React.Fragment>
                                {extendedTab === button.mainButton.key && button.subButtons?.length > 0 ? button.subButtons.map(subButton => (
                                    <React.Fragment key={button.mainButton.key + '-main_button-'+subButton.key+'sub_button'}>
                                        <Button
                                            content={subButton.value}
                                            handleClick={() => props.setOpenTab({
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
                                            fontColor={'#262626'}
                                            paddingType={'long'}
                                        />
                                    </React.Fragment>
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
                    value: PropTypes.any,
                    disabled: PropTypes.bool
                }
            ),
            subButtons: PropTypes.arrayOf(
                PropTypes.shape(
                    {
                        key: PropTypes.number,
                        value: PropTypes.any,
                        disabled: PropTypes.bool
                    }
                )
            )
        })
    ),
    setOpenTab: PropTypes.func,
    openTab: PropTypes.object,
    noMargin: PropTypes.bool
}