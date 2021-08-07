import {convertFromRaw, convertToRaw, EditorState} from 'draft-js';
import React, {useEffect, useState} from "react";
import dynamic from 'next/dynamic';
import styles from './styles/Input.module.css'
import PropTypes from "prop-types";

const Editor = dynamic(() => import('react-draft-wysiwyg').then(res => res.Editor),
    { ssr: false }
)


export default function DraftJS(props) {

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    useEffect(() => {
       if (!editorState.getCurrentContent().hasText()) {
            try {
                setEditorState(EditorState.createWithContent(
                    convertFromRaw(JSON.parse(props.value))
                ))
            } catch (error) {
                console.log(error)
            }
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
                <div className={styles.labelContainer}>{props.label}</div>


                <div className={styles.textArea} style={{maxHeight: props.maxHeight}}>
                    <Editor
                        editorState={editorState} readOnly={props.disabled}
                        onEditorStateChange={event => {
                            setEditorState(event)
                            if(typeof props.handleChange === 'function')
                                props.handleChange(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
                        }}
                        toolbarClassName={props.disabled ? styles.hidden : styles.toolbarContainer}
                    />
                </div>
            </div>
        )
    else return null
}

DraftJS.propTypes = {
    width: PropTypes.string,
    maxHeight: PropTypes.string,
    label: PropTypes.string,
    handleChange: PropTypes.func,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
}

