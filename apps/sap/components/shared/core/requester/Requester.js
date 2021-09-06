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

    const axiosPackage = props.method === 'get' ? {
        method: 'get',
        url: props.url,
        headers: {...{'authorization': props.token}, ...props.headers !== undefined ? props.headers : {}},
        params: props.package
    } : {
        method: props.method,
        url: props.url,
        headers: {...{'authorization': props.token}, ...props.headers !== undefined ? props.headers : {}},
        data: props.package
    }

    await axios(axiosPackage).then(response => {
        res = {
            error: false,
            data: response
        }

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
                    details: error.request.responseText,
                    httpStatusCode:error.response.status,
                    package: props.package,
                    method: props.method,
                    url: props.url
                }}
                type='error'
            />,
            newElement
        )
    })

    ReactDOM.unmountComponentAtNode(loader)
    document.body.removeChild(loader)

    if(res.error)
        throw res.data
    else
        return res.data
}
Requester.propTypes = {
    headers: PropTypes.object,
    token: PropTypes.string,
    package: PropTypes.object,
    url: PropTypes.string,
    method: PropTypes.oneOf(['get', 'put', 'post', 'delete', 'patch']),
    showSuccessAlert: PropTypes.bool
}
