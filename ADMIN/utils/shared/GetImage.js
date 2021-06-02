import PropTypes from 'prop-types'

export default function getImage(props) {
    let reader = new FileReader()

    if (props.event !== null && props.event.target.files.length > 0) {
        reader.readAsDataURL(props.event.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
            props.setImage({
                imageSrc: reader.result,
                file: props.event.target.files
            })
        }
        props.setChanged(true)
    } else {
        props.setImage({file: null, imageSrc: null, removed: true})
        props.handleChange({name: 'image', value: null})
    }

}

getImage.propTypes={
    event: PropTypes.array,
    setChanged: PropTypes.func,
    setImage: PropTypes.func,
    handleChange: PropTypes.func
}