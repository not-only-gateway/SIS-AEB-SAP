import styles from '../../styles/Loader.module.css'

export default function Loader(props){
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}/>
        </div>
    )
}