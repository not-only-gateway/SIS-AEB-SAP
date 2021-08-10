import {
    AddRounded,
    FileCopyRounded,
    MoreRounded,
    RemoveRounded,
    ZoomInRounded,
    ZoomOutRounded
} from "@material-ui/icons";
import NodeTemplate from "../../../templates/NodeTemplate";



export default [
    {
        label: 'Zoom out',
        icon: <ZoomOutRounded/>,
        onClick: (props) => props.setScale(props.scale - .25),
        getDisabled: (props) => props.scale === .5
    },
    {
        label: 'Zoom in',
        icon: <ZoomInRounded/>,
        onClick: (props) => props.setScale(props.scale + .25),
        getDisabled: (props) => props.scale === 2
    },
    {
        label: 'Adicionar novo módulo',
        icon: <AddRounded/>,
        onClick: (props) => null

    },
    {
        label: 'Colar',
        icon: <FileCopyRounded/>,
        onClick: (props) => null,
        getDisabled: (props) => props.copiedNode === null
    },
]