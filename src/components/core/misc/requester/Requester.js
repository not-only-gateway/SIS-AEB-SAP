import PropTypes from 'prop-types'
import axios from "axios";
import Alert from "./modules/alert/Alert";
import ReactDOM from 'react-dom'
import Loader from "./modules/loader/Loader";
import React from 'react'

export default async function Requester(props) {
    let res

    const loader = document.createElement('div')

    document.body.appendChild(loader)
    ReactDOM.render(
        <Loader/>,
        loader
    )

    const axiosPackage = {
        method: props.method,
        url: props.url,
        headers: props.headers,
        params: props.method === 'get' ? props.package : undefined,
        data: props.method === 'get' ? undefined : props.package
    }

    await axios(axiosPackage).then(response => {
        res = {
            error: false,
            data: response
        }
        ReactDOM.unmountComponentAtNode(loader)
        if (props.showSuccessAlert) {
            const newElement = document.createElement('div')
            document.body.appendChild(newElement)
            ReactDOM.render(
                <Alert
                    data={{
                        message: response.statusText,
                        details: JSON.stringify(response.request),
                        httpStatusCode: response.status,
                        package: props.package,
                        method: props.method,
                        url: props.url
                    }}
                    type='success'
                />,
                newElement
            )


        }
    }).catch(error => {
        ReactDOM.unmountComponentAtNode(loader)
        const newElement = document.createElement('div')
        document.body.appendChild(newElement)
        res = {
            error: true,
            data: error
        }
        ReactDOM.render(
            <Alert
                data={{
                    message: error.statusText,
                    details: error.response !== undefined ? error.request.responseText : 'server error',
                    httpStatusCode: error.response !== undefined ? error.response.status : '500',
                    package: props.package,
                    method: props.method,
                    url: props.url
                }}
                type='error'
            />,
            newElement
        )
    })



    if (res.error)
        throw res.data
    else
        return res.data
}
Requester.propTypes = {
    headers: PropTypes.object,
    package: PropTypes.object,
    url: PropTypes.string,
    method: PropTypes.oneOf(['get', 'put', 'post', 'delete', 'patch']),
    showSuccessAlert: PropTypes.bool
}
