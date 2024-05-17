import React, { useEffect, useState, useCallback } from 'react';
import { useSurferBot } from '../context/SurferBotContext';
import { FaCircleXmark } from "react-icons/fa6";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination
} from "@nextui-org/react";

const BotStatusTable = () => {
  const { api } = useSurferBot();
  const [page, setPage] = useState(1);
  const rowsPerPage = 15;
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

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

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [api, page]);

  const columns = [
    { name: "Name", uid: "Name" },
    { name: "Status", uid: "Status" },
    { name: "World", uid: "World" },
    { name: "Actions", uid: "Actions" },
  ];

  const renderCell = useCallback((botData, columnKey) => {
    switch (columnKey) {
      case "Name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{botData.detail.showGrowid}</p>
          </div>
        );
      case "Status":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{botData.detail.botStatus}</p>
          </div>
        );
      case "World":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{botData.detail.worldName}</p>
          </div>
        );
      case "Actions":
        return (
          <div className="flex flex-col">
            <FaCircleXmark onClick={() => api.botService.removeBot(botData.detail.id)} />
          </div>
        );
      default:
        return null;
    }
  }, [api.botService]);

  return (
    <div className="flex flex-col w-full max-w-[1024px] mx-auto">
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

export default BotStatusTable;
