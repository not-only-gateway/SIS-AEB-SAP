import React, {useRef} from "react";
import Cookies from "universal-cookie/lib";

export default function useCookies() {
    const cookies = useRef(new Cookies())
    const create = ({name, value, exp}) => {
        cookies.current.set(name, value, {expires: exp})
    }
    const remove = (name) => {
        cookies.current.remove(name)
    }
    const get = (name) => {
        return cookies.current.get(name)
    }

    const watch = ({name, callback}) => {
        setInterval(() => {
            callback(cookies.current.get(name))
        }, 1000)
    }
    return {create, remove, get, watch}
}