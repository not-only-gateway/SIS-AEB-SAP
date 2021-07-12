import PropTypes from 'prop-types'
import EntityTemplate from "../templates/NodeTemplate";

export default function HandleChange(props) {

    let items = [...props.entities]
    let index = -1
    items.find((element, i) => {
        if(element.id === props.event.id) {
            index = i
            return i
        }
    });
    let item = items[index]

    item.x = props.event.x;
    item.y = props.event.y;
    items[index] = item;
    props.setState(items);
}

HandleChange.propTypes = {
    entities: PropTypes.arrayOf(
        EntityTemplate
    ),
    setState: PropTypes.func,
    event: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        id: PropTypes.number
    }),

}

