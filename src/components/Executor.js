import React, { useState, useCallback, useEffect } from 'react';
import { useSurferBot } from '../context/SurferBotContext';
import { Button, Listbox, ListboxItem,Checkbox } from "@nextui-org/react";
import Editor from '@monaco-editor/react';
import { toast } from 'react-toastify';

const Executor = () => {
  
  const Files = ['test', 'test2', 'test3'];
  const [code, setCode] = useState('');
  const [selectedFile, setSelectedFile] = useState('test');
  const { api } = useSurferBot();

  const handleSave = useCallback(() => {
    toast.success('File saved successfully!', {
      position: "bottom-right",
      autoClose: 1000,
      theme: "dark",
    });
    
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      handleSave();
    }
  }, [handleSave]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col w-full max-w-[1024px] mx-auto">
      <div className="flex w-full">
        <div className="w-[200px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mr-4">
          <div className="flex justify-center mb-4">
            <Button size='sm' className="mr-4">Create</Button>
          </div>
          <Listbox
            aria-label="File selection"
            variant="flat"
            disallowEmptySelection
            value={selectedFile}
            onChange={setSelectedFile}
          >
            {Files.map((file, index) => (
              <ListboxItem key={file}>{file}</ListboxItem>
            ))}
          </Listbox>
        </div>
        <div className="flex-1">
          <div className="flex mb-4">
            <div className="flex w-1/5">
              <Button size='sm' className="mr-4" onClick={() => api.scriptService.executeScript(code)}>Run</Button>
              <Checkbox size='sm' className='mr-4' style={{ whiteSpace: 'nowrap' }}   >Select-All</Checkbox>
              <Button size='sm' onClick={handleSave}>Save</Button>
            </div>
          </div>
          <Editor width="100%" height="60vh" theme="vs-dark" defaultLanguage="lua" value={code} onChange={(e) => setCode(e)} />
        </div>
      </div>
    </div>
  );
};

export default Executor;