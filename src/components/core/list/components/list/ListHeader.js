import PropTypes from 'prop-types'
import styles from '../../styles/Header.module.css'
import React from "react";
import {AddRounded, FilterListRounded, RefreshRounded, SettingsRounded} from "@material-ui/icons";
import Dropdown from "./Dropdown";
import useHeader from "../../hook/useHeader";
import keyTemplate from "../../templates/keyTemplate";
import ListFilter from "../../../shared/components/ListFilter";

export default function ListHeader(props) {
    const {
        getType,
        parseDate,
        open,
        setOpen,
        selectedField,
        setSelectedField,
        getField
    } = useHeader(props.dispatch, props.actions)

    return (
        <>
            <div className={styles.header}  style={{marginBottom: props.filters.length === 0 ? '8px' : undefined}}>
                {props.title}
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <button
                        className={[styles.filter, styles.secondaryButton].join(' ')}
                        onClick={() => props.cleanState()}
                    >
                        Recarregar
                        <RefreshRounded style={{fontSize: '1.3rem'}}/>
                    </button>
                    <button
                        className={[styles.filter, styles.secondaryButton].join(' ')}
                        onClick={() => props.setOpenSettings(true)}
                    >
                        Configurações
                        <SettingsRounded style={{fontSize: '1.3rem'}}/>
                    </button>
                    <Dropdown
                        buttonClassname={[styles.filter, styles.secondaryButton].join(' ')}
                        disabled={false}
                        label={(
                            <div className={styles.dropdownLabel}>
                                Filtros
                                <FilterListRounded style={{fontSize: '1.3rem'}}/>
                            </div>
                        )}
                        buttons={props.keys.map(e => getField(e))}
                    />
                    <button style={{display: props.createOption ? undefined : 'none'}} onClick={() => props.onCreate()}
                            className={styles.filter}>
                        <AddRounded/>
                    </button>
                </div>
            </div>
            <ListFilter
                keys={props.keys} filters={props.filters} setFilters={props.setFilters}
                cleanState={props.cleanState} getType={getType} open={open} setOpen={setOpen}
                parseDate={parseDate} selectedField={selectedField} setSelectedField={setSelectedField}
            />
        </>
    )
}

ListHeader.propTypes = {
    hook: PropTypes.object,

    dispatch: PropTypes.func,
    actions: PropTypes.object,

    title: PropTypes.any,
    setFilters: PropTypes.func,
    filters: PropTypes.array,

    cleanState: PropTypes.func,
    keys: PropTypes.arrayOf(keyTemplate).isRequired,

    setOpenSettings: PropTypes.func,

    createOption: PropTypes.bool,
    onCreate: PropTypes.func
}
