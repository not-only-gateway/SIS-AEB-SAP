import {RenderTabs} from "sis-aeb-misc";
import UnitForm from "../structural/UnitForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import AddressForm from "../shared/AddressForm";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import styles from "../../styles/Person.module.css";
import UnitPT from "../../packages/locales/unit/UnitPT";
import shared from '../../styles/Shared.module.css'
import StructuralRequests from "../../utils/fetch/StructuralRequests";

export default function UnitForms(props) {
    const [openTab, setOpenTab] = useState(0)
    const [unit, setUnit] = useState(null)
    const [unitAddress, setUnitAddress] = useState(null)
    const lang = UnitPT

    useEffect(() => {
        StructuralRequests.fetchUnit(props.id).then(res => setUnit(res))
        StructuralRequests.fetchUnitAddress(props.id).then(res => setUnitAddress(res))
    }, [])

    return (
        <>
            <RenderTabs
                openTab={openTab}
                tabs={[
                    {
                        buttonKey: 0,
                        value: (
                            <div className={styles.personOptionsContainer} onClick={() => setOpenTab(1)}>
                                <button className={shared.buttonContainer}>
                                    {lang.base}
                                </button>
                                <button className={shared.buttonContainer} onClick={() => setOpenTab(2)}>
                                    {lang.address}
                                </button>
                            </div>
                        )
                    },
                    {
                        buttonKey: 1,
                        value: (
                            <UnitForm data={unit} create={false} id={props.id} returnToMain={() => setOpenTab(0)}
                                      handleChange={event => handleObjectChange({
                                          event: event,
                                          setData: setUnit
                                      })}
                            />
                        )
                    },
                    {
                        buttonKey: 2,
                        value: (
                            <AddressForm
                                id={props.id} data={unitAddress} type={'unit'} returnToMain={() => setOpenTab(0)}
                                handleChange={event => handleObjectChange({
                                    event: event,
                                    setData: setUnitAddress
                                })} create={unitAddress === null || unitAddress.id === undefined}
                            />
                        )
                    }
                ]}
            />
        </>
    )
}
UnitForms.propTypes = {
    id: PropTypes.number,

}