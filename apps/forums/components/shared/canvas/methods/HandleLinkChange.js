import PropTypes from 'prop-types'
import EntityTemplate from "../templates/NodeTemplate";

export default function HandleLinkChange(props) {

    let items = [...props.entities]
    let indexParent = -1
    let indexChild = -1
    items.find((element, i) => {
        if (element.id === props.event.childID)
            indexChild = i
        else if (element.id === props.event.parentID)
            indexParent = i
    });
    if (indexParent !== indexChild) {
        let child = items[indexChild]
        switch (props.event.action) {
            case 'create': {
                child.parents = [...child.parents, [{
                    ...props.event.linkParams, ...{
                        parent: props.event.parentID,
                        child: props.event.childID
                    }
                }]]
                props.updateEntity(child)
                break
            }
            case 'update': {
                let linkIndex = -1
                child.parents.find((element, index) => {
                    if (element.child === props.event.childID && element.parent === props.event.parentID)
                        linkIndex = index
                })
                child.parents[linkIndex] = {
                    ...props.event.linkParams, ...{
                        parent: props.event.parentID,
                        child: props.event.childID
                    }
                }

                props.updateEntity(child)
                break
            }
            case 'delete': {
                let linkIndex = -1
                child.parents.find((element, index) => {
                    if (element.child === props.event.childID && element.parent === props.event.parentID)
                        linkIndex = index
                })
                console.log('HERE')
                child.parents.splice(linkIndex, 1)

                props.updateEntity(child)

                break
            }
            default:
                break
        }
    }
}

HandleLinkChange.propTypes = {
    entities: PropTypes.arrayOf(
        EntityTemplate
    ),
    updateEntity: PropTypes.func,
    event: PropTypes.shape({
        parentID: PropTypes.number,
        childID: PropTypes.number,
        action: PropTypes.oneOf(['create', 'update', 'delete']),
        linkParams: PropTypes.shape({
            description: PropTypes.string,
            strong: PropTypes.bool
        })
    }),
}

