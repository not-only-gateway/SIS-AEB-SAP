import NodeTemplate from "../../../templates/NodeTemplate";

export default function Triangle(props) {
    return (
        <path d={'M 1295.7 1591.8 L 1337.7 1465.8 L 1505.7 1465.8 L 1547.7 1591.8 Z'} fill={'white'} stroke={'#e0e0e0'}/>
    )
}
Triangle.propTypes = {
    node: NodeTemplate
}