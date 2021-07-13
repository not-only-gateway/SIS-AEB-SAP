import PropTypes from 'prop-types'
import NodeTemplate from "../../templates/NodeTemplate";
import styles from '../../styles/NodeOverview.module.css'

export default function NodeOverview(props) {
    return (
        <div className={styles.overviewContainer} id={'node-overview'}>
            <div className={styles.body}>
                <div className={styles.header}>
                    <div style={{fontSize: '20px', fontWeight: 'bold', fontFamily: 'Roboto', color: '#393C44'}}>
                        {props.node.title}
                    </div>
                    <div style={{fontSize: '.9rem', fontFamily: 'Roboto', color: '#393C44'}}>
                        {props.node.description}
                    </div>
                </div>

                <div style={{fontSize: '.9rem', fontFamily: 'Roboto', color: '#393C44'}}>
                    {props.node.body}
                </div>


            </div>
            <div className={styles.footer}>
                <div style={{fontFamily: 'Roboto'}}>
                    Criado em:
                </div>
                <div style={{fontSize: '.9rem', fontFamily: 'Roboto', color: '#393C44'}}>
                    {new Date(props.node.creationDate).toDateString()}
                </div>

            </div>
        </div>
    )
}

NodeOverview.propTypes = {
    node: NodeTemplate,
    setState: PropTypes.func,
    data: PropTypes.object
}