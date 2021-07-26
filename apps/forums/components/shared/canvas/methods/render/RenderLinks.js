import Link from "../../modules/link/Link";
import ReactDOM from "react-dom";
import React from "react";
import CanvasTemplate from "../../templates/CanvasPropsTemplate";
import PropTypes from "prop-types";
import {v4 as uuid4} from 'uuid';

export default function RenderLinks(props) {

    const handleStepCreation = (event, target, source) => {
        // const newSteps = [...props.data.links]
        // newSteps.push({
        //     id: uuid4().toString(),
        //     description: '',
        //     target: v,
        //     source: source
        // })
    }

    return (
        props.data.links.map((link, index) => (
            <g key={`${link.child.id}-link-${link.parent.id}`}>
                <Link
                    target={link.parent} source={link.child}
                    type={link.type} color={() => {
                    const color = props.data.nodes.find(node => {
                        if (node.id === link.parent.id)
                            return node
                    })
                    if (color !== undefined)
                        return color.color
                    else return undefined
                }}
                    setSelected={props.setSelectedLink}
                    selectedLink={props.selectedLink}
                    handleChange={event => {
                        let newLink = {...link}
                        newLink[event.name] = event.value
                        let newLinks = [...props.data.links]

                        newLinks[index] = newLink
                        props.setData({...props.data, links: newLinks})
                    }}
                    canEdit={props.options.edit} handleContextClose={props.handleContextClose}
                    rootOffset={props.root} handleStepCreation={handleStepCreation}
                    openContextMenu={(event, x, y) => {
                        if (event === null) {
                            ReactDOM.unmountComponentAtNode(props.contextMenuRef)

                        } else {
                            ReactDOM.render(
                                event,
                                props.contextMenuRef
                            )

                            props.contextMenuRef.style.top = y + 'px'
                            props.contextMenuRef.style.left = x + 'px'
                        }
                    }}
                    deleteLink={() => {
                        let newLinks = []
                        props.data.links.map(l => {
                            if (!(l.parent.id === link.parent.id && l.child.id === link.child.id))
                                newLinks.push(l)
                        })
                        props.setData({...props.data, links: newLinks})
                    }}
                    description={link.description}
                />
            </g>
        ))
    )
}
RenderLinks.propTypes = {
    ...CanvasTemplate,
    ...{
        contextMenuRef: PropTypes.object,
        root: PropTypes.object,
        setData: PropTypes.func,
        data: PropTypes.object,
        selectedLink: PropTypes.string,
        setSelectedLink: PropTypes.func,
        handleContextClose: PropTypes.func
    }
}