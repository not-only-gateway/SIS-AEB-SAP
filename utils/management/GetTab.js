import PropTypes from 'prop-types'
import React from "react";
import AccessProfileList from "../../components/templates/list/AccessProfileList";
import AccessProfileForm from "../../components/templates/forms/AccessProfileForm";
import EffectiveRoleList from "../../components/templates/list/EffectiveRoleList";
import CommissionedRoleList from "../../components/templates/list/CommissionedRoleList";
import LinkageList from "../../components/templates/list/LinkageList";
import EffectiveRoleForm from "../../components/templates/forms/EffectiveRoleForm";
import CommissionedRoleForm from "../../components/templates/forms/CommissionedRoleForm";
import LinkageForm from "../../components/templates/forms/LinkageForm";

export default function GetTab(props) {
    let response = []


    switch (props.option) {
        case 0: {
            response = [
                {
                    buttonKey: 0,
                    value: (
                        <AccessProfileList locale={props.locale}/>
                    )
                },

                {
                    buttonKey: 1,
                    value: (
                        <AccessProfileForm locale={props.locale} id={undefined} create={true}/>
                    )
                },

            ]
            break
        }
        case 1: {
            response = [
                {
                    buttonKey: 0,
                    value: (
                        <EffectiveRoleList locale={props.locale}/>
                    )
                },

                {
                    buttonKey: 1,
                    value: (
                        <EffectiveRoleForm data={undefined} locale={props.locale} create={true}/>
                    )
                },

            ]
            break
        }
        case 2: {
            response = [
                {
                    buttonKey: 0,
                    value: (
                        <CommissionedRoleList locale={props.locale}/>
                    )
                },

                {
                    buttonKey: 1,
                    value: (
                        <CommissionedRoleForm create={true} locale={props.locale} data={undefined}/>
                    )
                },

            ]
            break
        }
        case 3: {
            response = [
                {
                    buttonKey: 0,
                    value: (
                        <LinkageList locale={props.locale}/>
                    )
                },

                {
                    buttonKey: 1,
                    value: (
                        <LinkageForm data={undefined} locale={props.locale} create={true}/>
                    )
                },

            ]
            break
        }
        default:
            break
    }
    return response
}

GetTab.propTypes = {
    option: PropTypes.number,
    locale: PropTypes.string
}