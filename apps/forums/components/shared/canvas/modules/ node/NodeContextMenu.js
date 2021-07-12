import styles from "../../styles/Canvas.module.css";
import {DeleteForeverRounded, EditRounded, LinkRounded, VisibilityRounded} from "@material-ui/icons";
import React from "react";
import PropTypes from 'prop-types'

export default function NodeContextMenu(props){
 return(
     <div className={styles.options}>
         <button className={styles.optionButton} onClick={() => props.show(props.entity)}>
             <VisibilityRounded/>
             Visualizar
         </button>
         <button className={styles.optionButton} onClick={() => props.edit(props.entity)}
                 style={{display: props.editable ? undefined : 'none'}}><EditRounded/>
             Editar
         </button>

         <button
             className={styles.optionButton}
             onClick={() => {
                 if (props.linkable && props.toBeLinked.id === props.entity.id) {
                     props.setLinkable(false)
                 } else if (!props.linkable) {
                     props.setLinkable(true)
                     props.handleLink(props.entity)
                     props.setLink(true)
                 }
             }} style={{
             color: props.link ? '#ff5555' : '#0095ff',
             display: props.editable ? undefined : 'none'
         }}>
             <LinkRounded/>
             Criar conexão
         </button>
         <button className={styles.optionButton} onClick={() => props.handleDelete(props.entity)}
                 style={{
                     display: props.editable ? undefined : 'none',
                     color: '#ff5555',
                     border: 'none'
                 }}>
             <DeleteForeverRounded/>
             Deletar modulo
         </button>
     </div>
 )
}
NodeContextMenu.propTypes={
    entity:PropTypes.object,
    editable: PropTypes.bool,
    handleLink:PropTypes.func,
    linkable:PropTypes.bool,
    setLinkable:PropTypes.func,
    show:PropTypes.func,
    edit: PropTypes.func,
    link: PropTypes.bool,
    setLink: PropTypes.func

}