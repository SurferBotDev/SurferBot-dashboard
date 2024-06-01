import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useModal } from '../../context/ModalContext';
import { useSurferBot } from "../../context/SurferBotContext";

export default function AddBot() {
  const { modals, closeModal } = useModal();
  const [growid, setGrowid] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [proxy, setProxy] = useState(''); 

  const handleChange = (event) => {
    const setter = (value) => setState(value); 
    const setState = (newValue) => {
      event.target.name === 'growid' ? setGrowid(newValue) :
        event.target.name === 'password' ? setPassword(newValue) :
          setProxy(newValue);
    };
    setter(event.target.value);
  };

  const { api } = useSurferBot();

  return (
    <Modal isOpen={modals.AddBot} onClose={() => closeModal('AddBot')}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add Bot</ModalHeader>
        <ModalBody>
          <Input type="text" label="Growid" value={growid} name="growid" onChange={handleChange} />
          <Input type="password" label="Password" value={password} name="password" onChange={handleChange} />
          <Input type="text" label="Proxy" value={proxy} name="proxy" placeholder="ip:port:user:pass" onChange={handleChange} />
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => api.botService.addBot(growid, password, proxy)}>
            Add Bot
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
