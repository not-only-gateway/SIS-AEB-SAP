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
                                elevation={props.openTab === button.key} disabled={false} padding={'8px 32px 8px 32px'}
                                variant={'rounded'} width={'auto'}
                                border={props.openTab === button.key ? '#eeeef1 1px solid' : 'transparent 1px solid'}
                                backgroundColor={props.openTab === button.key ? 'white' : 'transparent'}
                                fontColor={'#262626'} paddingType={'long'} hoverHighlight={false}
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