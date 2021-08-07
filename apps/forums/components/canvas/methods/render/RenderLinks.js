import Link from "../../modules/link/Link";
import ReactDOM from "react-dom";
import React from "react";
import CanvasTemplate from "../../templates/CanvasPropsTemplate";
import PropTypes from "prop-types";
import {v4 as uuid4} from 'uuid';

export default function RenderLinks(props) {

    const handleStepCreation = (event, link) => {
        let newSteps = {
            id: uuid4().toString(),
            description: '',
            placement: {x: event.clientX - props.root.offsetLeft, y: event.clientY - props.root.offsetTop - 80}
        }
        let newLinks = [...props.data.links]
        newLinks[newLinks.indexOf(link)] = {
            ...newLinks[newLinks.indexOf(link)],
            ...{
                step: newSteps
            }
        }

        props.setData({
            ...props.data,
            links: newLinks
        })
    }

    return (
        props.data.links.map((link, index) => (
            <g key={`${link.child.id}-link-${link.parent.id}`}>
                <Link
                    target={link.parent}
                    source={link.child}
                    type={link.type}
                    color={() => {
                        const color = props.data.nodes.find(node => {
                            if (node.id === link.parent.id)
                                return node
                        })
                        console.log(color)
                        if (color !== undefined)
                            return color.styling.color
                        else return 'transparent'
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
                    rootOffset={props.root} handleStepCreation={event => handleStepCreation(event, link)}
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
                        let newLinks = [...props.data.links]
                        const index = newLinks.indexOf(link)
                        let newNodes = [...props.data.nodes]

                        newNodes[link.child.index].links.splice(newNodes[link.child.index].links.find((l, index) => {
                            if (l === link)
                                return index
                        }), 1)
                        newNodes[link.parent.index].links.splice(newNodes[link.parent.index].links.find((l, index) => {
                            if (l === link)
                                return index
                        }), 1)
                        if (index > -1) {
                            newLinks.splice(index, 1)
                            props.setData({
                                ...props.data,
                                links: newLinks,
                                nodes: newNodes
                            })
                        }
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