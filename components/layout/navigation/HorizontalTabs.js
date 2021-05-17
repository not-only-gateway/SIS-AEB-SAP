import PropTypes from 'prop-types'
import Button from "../../modules/selector/Button";
// import {Button} from "@material-ui/core";

export default function HorizontalTabs(props) {
    // const [open, setOpen] = useState(null)


    return (
        <div key={'tab-component'}
             style={{
                 display: 'flex',
                 gap: '8px',
                 justifyContent: 'center',
                 width: 'fit-content',
                 backgroundColor: '#f4f5fa',
                 marginTop: props.noMargin ? 0 : '16px',
                 transition: '300ms ease-in-out',
                 borderRadius: '32px',
                 padding: '3px',
                 border: '#ecedf2 .7px solid'
             }}>
            {props.buttons.map((button) => {
                    if (button !== null)
                        return (

                            <Button
                                content={button.value} handleClick={() => props.setOpenTab(button.key)}
                                highlight={props.openTab === button.key} disabled={false}
                                rounded={true} width={'auto'} highlightType={'white'} paddingType={'long'}
                            />
                        )
                    else
                        return null
                }
            )}
        </div>
    )
}
HorizontalTabs.proptypes = {
    buttons: PropTypes.object,
    setOpenTab: PropTypes.func,
    openTab: PropTypes.object,
    noMargin: PropTypes.bool
}