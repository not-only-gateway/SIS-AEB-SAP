import {Overview, RenderTabs} from "sis-aeb-misc";
import UnitForm from "../structural/UnitForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import AddressForm from "../shared/AddressForm";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import styles from "../../styles/Person.module.css";
import OptionRow from "../person/OptionRow";

import UnitPT from "../../packages/locales/unit/UnitPT";
import AddressOverview from "../shared/AddressOverview";
import UnitOverview from "./UnitOverview";
import StructuralRequests from "../../utils/fetch/StructuralRequests";

export default function UnitForms(props) {
    const [openTab, setOpenTab] = useState(0)
    const [unit, setUnit] = useState(null)
    const [unitAddress, setUnitAddress] = useState(null)
    const lang = UnitPT

    useEffect(() => {
        console.log(unitAddress)
        StructuralRequests.fetchUnit(props.id).then(res => setUnit(res))
        StructuralRequests.fetchUnitAddress(props.id).then(res => setUnitAddress(res))
        console.log(unitAddress)
    }, [])

    return (
        <>
            <RenderTabs
                openTab={openTab}
                tabs={[
                    {
                        buttonKey: 0,
                        value: (
                            <div className={styles.personOptionsContainer}>
                                <OptionRow setOption={() => setOpenTab(1)} setHistory={() => null}
                                           label={lang.base}
                                           modalContent={unit === null || unit === undefined ? null :
                                               <Overview entity={unit} fields={UnitOverview}/>
                                           }/>
                                <OptionRow setOption={() => setOpenTab(2)} label={lang.address} setHistory={() => null}
                                           modalContent={unitAddress === null || unitAddress === undefined ? null :
                                               <Overview entity={unitAddress} fields={AddressOverview}/>}/>
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
                                })}
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