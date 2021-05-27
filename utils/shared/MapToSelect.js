import PropTypes from 'prop-types'

export default function mapToSelect(props) {
    let response = []
    switch (props.option) {
        case 0: {
            props.data.map(data => {
                response.push({
                    key: data.id,
                    value: data.acronym
                })
            })
            break
        } // unit
        case 1: {
            props.data.map(data => {
                response.push({
                    key: data.id,
                    value: data.denomination
                })
            })
            break
        } // effective
        case 2: {
            props.data.map(commissioned => {
                response.push({
                    key: commissioned.id,
                    value: commissioned.das ? 'DAS - ' + commissioned.denomination: 'FCPE - ' + commissioned.denomination
                })
            })
            break
        } // commissioned
        case 3: {
            props.data.map(senior => {
                response.push({
                    key: senior.id,
                    value: senior.name + ' - ' + senior.unit_acronym
                })
            })
            break
        } // SENIORS
        case 4: {
            props.data.map(collaboration => {
                response.push({
                    key: collaboration.id,
                    value: collaboration.tag
                })
            })
            break
        } // collaboration
        case 5: {
            props.data.map(unit => {
                response.push({
                    key: unit.id,
                    value: unit.acronym,
                    parent_entity: unit.parent_entity
                })
            })
            break
        } // unit + parent entity

        default: {
            break
        }
    }
    return response
}
mapToSelect.propTypes={
    option: PropTypes.number,

    data: PropTypes.array
}
