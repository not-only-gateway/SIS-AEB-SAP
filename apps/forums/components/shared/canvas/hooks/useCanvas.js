import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import CanvasContextMenu from "../modules/canvas/CanvasContextMenu";

export default function useCanvas(props) {
    document.addEventListener('mousedown', (event) => {
        console.log(event.target.className)
        if (props.contextMenuRef.current !== null && props.contextMenuRef.current.firstChild && event.button === 0 && event.target.className !== 'Pop_popContainer__1N8Wc' && event.target.className !== 'Styles_lineContentContainer__1xCXK' && event.target.className !== 'Canvas_optionButton__1K9rT' && event.target.className !== 'Canvas_lineContentContainer__1xCXK') {
            ReactDOM.unmountComponentAtNode(props.contextMenuRef.current)
            props.setOpenMenu(null)
        }
    })
    document.addEventListener('contextmenu', (event) => {

        if ((event.target.className === 'Canvas_canvasContainer__3aNqn' || event.target.className === 'Frame_canvasContainer__1kTfh') && props.options.edit && props.root !== undefined) {
            if (props.contextMenuRef.current.firstChild)
                ReactDOM.unmountComponentAtNode(props.contextMenuRef.current)
            ReactDOM.render(
                <CanvasContextMenu
                    handleTriggerUpdate={props.handleTriggerUpdate}
                    handleCreate={props.handleCreate}/>,
                props.contextMenuRef.current
            )
            props.contextMenuRef.current.style.top = (event.clientY - props.root.offsetTop) + 'px'
            props.contextMenuRef.current.style.left = (event.clientX - props.root.offsetLeft)+ 'px'
        }
        event.preventDefault();
    })
}

useCanvas.propTypes = {
    contextMenuRef: PropTypes.object,
    setOpenMenu: PropTypes.func,
    root: PropTypes.object,

    handleCreate: PropTypes.func,
    handleTriggerUpdate: PropTypes.func,

    options: PropTypes.shape({
        edit: PropTypes.bool,
        move: PropTypes.bool,
        show: PropTypes.bool
    }),

}