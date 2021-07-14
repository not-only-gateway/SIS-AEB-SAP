import NodeTemplate from "../../templates/NodeTemplate";
import PropTypes from "prop-types";
import styles from "../../styles/NodeOverview.module.css";
import {ColorField, DropDownField, ImageField, TextField} from "sis-aeb-inputs";
import React, {useState} from "react";
import NodeFormPT from "../../locales/NodeFormPT";
import {CloseRounded} from "@material-ui/icons";
import handleObjectChange from "../../../../../utils/shared/HandleObjectChange";


export default function NodeForm(props) {
    const [changed, setChanged] = useState(false)
    const [node, setNode] = useState(props.node)
    const lang = NodeFormPT
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const handleSubmit = async () => {
        let index
        props.data.nodes.map((elem, i) => {
            if (elem.id === node.id)
                index = i
        })
        let image = node.image

        if (typeof (image) !== 'string' && image !== null && image !== undefined) {
            image = await toBase64(image).catch(e => Error(e))
            handleObjectChange({event: {name: 'image', value: image}, setData: setNode})
        }

        const newNodes = [...props.data.nodes]
        newNodes[index] = node

        props.setState(({
            ...props.data,
            nodes: newNodes
        }))
        setChanged(false)
    }
    return (
        <div className={styles.formContainer} id={'node-overview'}>
            <button className={styles.closeButtonContainer} onClick={() => props.handleClose()}>
                <CloseRounded/>
            </button>
            <div>

                <TextField

                    placeholder={lang.title} label={lang.title}
                    handleChange={event => {
                        setChanged(true)
                        console.log(event.target.value)
                        handleObjectChange({event: {name: 'title', value: event.target.value}, setData: setNode})
                    }}
                    value={node === null ? null : node.title}
                    required={true}
                    width={'100%'}/>

                <TextField
                    placeholder={lang.description} label={lang.description}
                    handleChange={event => {
                        setChanged(true)
                        handleObjectChange({event: {name: 'description', value: event.target.value}, setData: setNode})
                    }}
                    value={node === null ? null : node.description}
                    required={true} width={'100%'}/>


                <ImageField
                    disabled={false} setChanged={setChanged}
                    initialImage={node !== null && node !== undefined ? (node.image !== null ? node.image : null) : null}
                    size={'100px'}
                    setImage={event =>
                        handleObjectChange({
                            event: {
                                name: 'image',
                                value: event !== null ? event.target.files[0] : null
                            }, setData: setNode
                        })
                    }
                    label={lang.image}
                    required={false} width={'100%'}/>

                <TextField
                    placeholder={lang.body} label={lang.body}
                    handleChange={event => {
                        setChanged(true)
                        handleObjectChange({event: {name: 'body', value: event.target.value}, setData: setNode})
                    }}
                    value={node === null ? null : node.body}
                    required={false} width={'100%'}/>
                <ColorField
                    required={false} width={'100%'}
                    value={node === null ? null : node.color}
                    handleChange={event => {
                        setChanged(true)
                        handleObjectChange({event: {name: 'color', value: event}, setData: setNode})
                    }} label={lang.highlight}/>

                <DropDownField
                    choices={[{key: 'circle', value: 'Círculo'}, {key: 'default', value: 'Padrão'}]}

                    placeholder={lang.shape} label={lang.shape}
                    handleChange={event => {
                        setChanged(true)
                        handleObjectChange({event: {name: 'shape', value: event}, setData: setNode})
                    }}
                    value={node === null ? null : node.shape}
                    required={true}
                    width={'100%'}
                />
                <button onClick={() => handleSubmit()} disabled={!node || !node.description || !node.title || !changed}
                        className={styles.saveButton}>
                    Salvar
                </button>
            </div>
        </div>

    )
}

NodeForm.propTypes = {
    node: NodeTemplate,
    setState: PropTypes.func,
    data: PropTypes.object,
    handleClose: PropTypes.func
}