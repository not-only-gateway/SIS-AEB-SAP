import PropTypes from 'prop-types'

export default function mapToSelect(props) {
    let response = []
    switch (props.option) {
        case 0: {

            props.units.map(data => {
                response.push({
                    key: data.unit.id,
                    value: data.unit.acronym
                })
            })
            break
        } // unit
        case 1: {
            props.effectiveRoles.map(data => {
                response.push({
                    key: data.role.id,
                    value: data.role.denomination + ' - ' + data.linkage.denomination
                })
            })
            break
        } // effective
        case 2: {
            props.commissionedRoles.map(data => {
                response.push({
                    key: data.role.id,
                    value: data.role.das ? 'DAS - ' : 'FCPE - ' + data.role.denomination + ' - ' + data.linkage.denomination
                })
            })
            break
        } // commissioned
        case 3: {
            props.seniors.map(senior => {
                response.push({
                    key: senior.collaboration.id,
                    value: senior.person.name + ' - ' + senior.unit.acronym
                })
            })
            break
        } // SENIORS
        case 4: {
            props.accessProfiles.map(data => {
                response.push({
                    key: data.id,
                    value: data.denomination
                })
            })
            break
        }
        default: {
            break
        }
    }
    return response
}
mapToSelect.propTypes={
    option: PropTypes.number,
    accessProfiles: PropTypes.array,
    seniors: PropTypes.array,
    commissionedRoles: PropTypes.array,
    effectiveRoles: PropTypes.array,
    units: PropTypes.array,
}