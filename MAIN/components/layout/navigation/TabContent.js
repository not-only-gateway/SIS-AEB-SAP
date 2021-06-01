import PropTypes from 'prop-types'
import mainStyles from '../../../styles/shared/Main.module.css'

export default function TabContent(props) {
    return (
        <div key={props.key}>
            {props.tabs.map(tab => {
                if (tab !== null && tab.buttonKey === props.openTab) {
                    if (props.noContainer)
                        return tab.value
                    else
                        return (
                            <div className={mainStyles.displayInlineCenter} style={{
                                position: "relative",
                                zIndex: 100,
                                width: '100%',
                                marginTop: '25px',
                            }}
                                 key={tab.buttonKey + '-content-'+props.key}>
                                {tab.value}
                            </div>
                        )
                } else
                    return null
            })}
        </div>
    )
}

TabContent.propTypes =  {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            buttonKey: PropTypes.number,
            value: PropTypes.any
        })
    ),
    openTab: PropTypes.any,
    noContainer: PropTypes.bool,
    key: PropTypes.string
}