import React, { useEffect, useState, useCallback } from 'react';
import { useSurferBot } from '../context/SurferBotContext';
import { FaCircleXmark } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, Button } from "@nextui-org/react";
import { useModal } from '../context/ModalContext';

const BotStatus = () => {
  const { api } = useSurferBot();
  const [page, setPage] = useState(1);
  const rowsPerPage = 15;
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { openModal } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const status = await api.globalService.getStatus();
        const bots = status.bots || [];
        const start = (page - 1) * rowsPerPage;
        const paginatedBots = bots.slice(start, start + rowsPerPage);
        setItems(paginatedBots);
        setTotalPages(Math.ceil(bots.length / rowsPerPage));
      } catch (error) {
        console.error('Error fetching bots:', error);
        setItems([]);
        setTotalPages(0);
      }
    };

    const interval = setInterval(fetchData, 250);
    return () => clearInterval(interval);
  }, [api, page]);

  const columns = [
    { name: "Name", uid: "Name" },
    { name: "Status", uid: "Status" },
    { name: "World", uid: "World" },
    { name: "Actions", uid: "Actions" },
  ];

  const renderCell = useCallback((botData, columnKey) => {
    const columnMap = {
      "Name": botData.detail.showGrowid + " ["+ botData.detail.ms +"]",
      "Status": botData.detail.botStatus,
      "World": botData.detail.worldName,
      "Actions": (
        <div className="flex flex-row space-x-2">
          <IoSettingsOutline onClick={() => openModal('BotSettings')} style={{ fontSize: "1.2rem" }} />
          <FaCircleXmark onClick={() => api.botService.removeBot(botData.detail.id)} style={{ fontSize: "1.2rem" }} />
        </div>
      ),
    };

    const renderContent = (content) => (
      <div className="flex flex-col">
        {typeof content === 'string' || typeof content === 'number' ? (
          <span className="text-bold text-sm capitalize">{content}</span>
        ) : (
          content
        )}
      </div>
    );

    return columnKey in columnMap ? renderContent(columnMap[columnKey]) : null;
  }, [api.botService, openModal]);

  return (
    <div className="flex flex-col w-full max-w-[1024px] mx-auto">
      <div className="flex justify-end ">
        <Button size="md" className="px-4 py-1 m-4" onPress={() =>  openModal('AddBot')}>
          Add Bot
        </Button>
      </div>

      <Table
        aria-label="Example static collection table"
        bottomContent={
          rowsPerPage < items.length && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={totalPages}
                onChange={(newPage) => setPage(newPage)}
              />
            </div>
          )
        }
        classNames={{
          wrapper: rowsPerPage < items.length ? "min-h-[222px]" : "",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "Actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.detail.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BotStatus;
