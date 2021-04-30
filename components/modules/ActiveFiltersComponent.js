import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import animations from '../../styles/shared/Animations.module.css'

export default function ActiveFiltersComponent(props) {
    if (!props.active)
        return (
            <div className={mainStyles.displayWarp}
                 style={{gap: '16px', width: '75%', marginTop: '10px'}}>
                {props.activeFilters.map((filter, index) => {
                    if (filter.value !== null)
                        return (
                            <div key={filter.key}
                                 className={[animations.popInAnimation, mainStyles.overflowEllipsis].join(' ')} style={{
                                backgroundColor: 'white',
                                maxWidth: 'calc(12.5% - 16px)',
                                animationDelay: index * 10 + 'ms',
                                padding: '10px',
                                fontSize: '.8rem',
                                color: '#555555',
                                borderRadius: '5px',
                                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                                maxHeight: '37px'
                            }}>
                                {filter.value}
                            </div>
                        )
                    else
                        return null
                })}
            </div>
        )
    else
        return null
}

ActiveFiltersComponent.propTypes={
    activeFilters: PropTypes.array,
    active: PropTypes.bool
}