import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useModal } from '../../context/ModalContext';
import { useState } from "react";
import { useSurferBot } from "../../context/SurferBotContext";
export default function AddBot() {
    const {modals, closeModal } = useModal();
    const [growid, setGrowid] = useState()
    const [password, setPassword] = useState()
    const [proxy, setProxy] = useState()
    const handleChange = setter => e => setter(e.target.value);
    const { api } = useSurferBot();

    return <Modal isOpen={modals["AddBot"]} onClose={() => closeModal("AddBot")}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Add Bot</ModalHeader>
                    <ModalBody>
                        <Input type="text" label="Growid" value = {growid}  onChange={handleChange(setGrowid)}/>
                        <Input type="text" label="Password" value = {password} onChange={handleChange(setPassword)}/>
                        <Input type="text" label="Proxy" value = {proxy} placeholder="ip:port:user:pass"  onChange={handleChange(setProxy)} />

                    </ModalBody>
                    <ModalFooter>
                        <Button  onPress={() => api.botService.addBot(growid,password,proxy)}>
                                Add Bot
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
}