import React from "react";

import {personKeys} from "../keys/keys";
import getQuery from "../queries/getQuery";
import {
    useCopyToClipboard, useFile,

    Empty,
    request, Alert, ToolTip,

    Selector, Form, FormRow, DateField,
    SelectField, MultiSelectField,
    TextField, Button, Checkbox, CheckboxGroup,
    FileField,

    ThemeContext, MfcWrapper, Ripple,

    ScrollStepper, StepperWrapper,
    Tab, Tabs, VerticalTabs, Modal, Breadcrumbs,
    Carousel, DynamicRoutes, Switcher, RailActionButton,
    RailContext, NavigationRail, Dropdown, RailActionWrapper,

    List,  Feed, FeedCard, Filter,
    useInfiniteScroll, useQuery

} from 'mfc-core';
export default function PersonList(){
    const hook = useQuery(getQuery('person'))

    return (
        <>

            <List
                hook={hook}
                keys={personKeys}
                title={'Colaboradores'}
            />
        </>
    )
}