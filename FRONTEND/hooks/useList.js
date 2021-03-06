import React, {useState} from "react";
import deleteEntry from "../apps/sap/utils/delete";

export default function useList(url, clean, customURL){
    const [message, setMessage] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [currentEl, setCurrentEl] = useState()

    return {message, setMessage, openModal, setOpenModal, onDecline: () => setOpenModal(false), setCurrentEl, onAccept: () => {
            deleteEntry({
                suffix:url,
                pk: typeof currentEl === 'object' ? null : currentEl,
                customPackage: typeof currentEl === 'object' ? currentEl : null,
                url: customURL
            }).then(() => {
                setOpenModal(false)
                clean()
            })
        }}
}