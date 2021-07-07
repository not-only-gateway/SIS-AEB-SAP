import {EditorState} from 'draft-js';
import React, {useEffect, useState} from "react";
import dynamic from 'next/dynamic';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw  } from 'draft-js';
const Editor = dynamic(() => import('react-draft-wysiwyg').then(res => res.Editor),
    { ssr: false }
)
import styles from './styles/Input.module.css'
import PropTypes from "prop-types";


export default function TextArea(props) {

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    useEffect(() => {
        try{
            setEditorState(EditorState.createWithContent(
                convertFromRaw(JSON.parse(props.value))
            ))
        }catch(error){
            console.log(error)
        }

    }, [props.value])
    if (typeof window !== 'undefined' && process.browser )
        return (
            <div
                style={{
                    width: props.width,
                    display: 'grid',
                    alignItems: props.value ? 'unset' : 'flex-start',
                    gap: '4px',
                }}
            >
                <p className={styles.labelContainer}>{props.label}</p>


                <div className={styles.textArea} style={{maxHeight: props.maxHeight}}>
                    <Editor
                        editorState={editorState} readOnly={props.disabled}
                        onEditorStateChange={event => {
                            setEditorState(event)
                            if(typeof props.handleChange === 'function')
                                props.handleChange(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
                        }}
                        toolbarClassName={props.disabled ? styles.hidden : 'toolbarClassName'}
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                    />
                </div>
            </div>
        )
    else return null
}

TextArea.propTypes = {
    width: PropTypes.string,
    maxHeight: PropTypes.string,
    label: PropTypes.string,
    handleChange: PropTypes.func,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
}

