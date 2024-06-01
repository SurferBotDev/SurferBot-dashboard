import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useModal } from '../../context/ModalContext';
import { useSurferBot } from "../../context/SurferBotContext";

export default function AddProxy() {
  const { modals, closeModal } = useModal();
  const [proxy, setProxy] = useState(''); 

  const handleChange = (event) => {
    setProxy(event.target.value);
  };

  const { api } = useSurferBot();

  return (
    <Modal isOpen={modals.AddProxy} onClose={() => closeModal('AddProxy')}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add Proxy</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            label="Proxy"
            value={proxy}
            placeholder="ip:port:user:pass"
            onChange={handleChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => api.proxyService.addProxy(proxy)}>
            Add Proxy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
