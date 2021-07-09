import styles from "../../styles/Styles.module.css";
import {DeleteForeverRounded, EditRounded, LinkRounded, VisibilityRounded} from "@material-ui/icons";
import React from "react";
import PropTypes from 'prop-types'
export default function NodeContextMenu(props){
 return(
     <div className={styles.options}>
         <button className={styles.optionButton} onClick={() => props.show(props.entity.current)}>
             <VisibilityRounded/>
             Visualizar
         </button>
         <button className={styles.optionButton} onClick={() => props.edit(props.entity.current)}
                 style={{display: props.editable ? undefined : 'none'}}><EditRounded/>
             Editar
         </button>

         <button
             className={styles.optionButton}
             onClick={() => {
                 if (props.linkable && props.getEntityKey(props.toBeLinked) === props.getEntityKey(props.entity.current)) {
                     props.setLinkable(false)
                 } else if (!props.linkable) {
                     props.setLinkable(true)
                     props.handleLink(props.entity.current)
                     props.setLink(true)
                 }
             }} style={{
             color: props.link ? '#ff5555' : '#0095ff',
             display: props.editable ? undefined : 'none'
         }}>
             <LinkRounded/>
             Criar conexão
         </button>
         <button className={styles.optionButton} onClick={() => props.handleDelete(props.entity.current)}
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