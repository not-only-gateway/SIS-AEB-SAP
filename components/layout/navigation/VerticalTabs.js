import PropTypes from 'prop-types'
import Button from "../../modules/inputs/Button";


export default function VerticalTabs(props) {


    return (
        <div key={'vertical-tab-component'}
             style={{
                 display: 'grid',
                 gap: '8px',
                 justifyContent: 'center',
                 width: 'fit-content',

                 transition: '300ms ease-in-out',
                 borderRadius: '8px',
                 backgroundColor: '#f4f5fa',
                 padding: '8px',
                 border: '#ecedf2 .7px solid'
             }}>
            {props.buttons.map((button) => {
                    if (button !== null)
                        return (
                            <Button
                                content={button.value} handleClick={() => props.setOpenTab(button.key)}
                                highlight={props.openTab === button.key} disabled={false}
                                variant={'rounded'} width={'100%'} highlightColor={'white'} fontHighlightColor={'#262626'} paddingType={'long'}
                            />
                        )
                    else
                        return null
                }
            )}
        </div>
    )
}
VerticalTabs.proptypes = {
    buttons: PropTypes.object,
    setOpenTab: PropTypes.func,
    openTab: PropTypes.object,

}