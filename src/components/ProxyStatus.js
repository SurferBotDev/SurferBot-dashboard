import React, { useEffect, useState, useCallback } from 'react';
import { useSurferBot } from '../context/SurferBotContext';
import { FaCircleXmark } from "react-icons/fa6";
import { IoCheckmarkOutline } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";
import { MdCheckCircleOutline } from "react-icons/md";

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Pagination,
    Button,
    Spinner,
    Tooltip
} from "@nextui-org/react";

import { useModal } from '../context/ModalContext';


const ProxyStatus = () => {
    const { api } = useSurferBot();
    const [page, setPage] = useState(1);
    const rowsPerPage = 15;
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const { openModal } = useModal();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const status = await api.proxyService.getProxies();
                const proxies = status.proxies || [];
                const start = (page - 1) * rowsPerPage;
                const paginatedProxies = proxies.slice(start, start + rowsPerPage);
                setItems(paginatedProxies);
                setTotalPages(Math.ceil(proxies.length / rowsPerPage));
            } catch (error) {
                console.error('Error fetching proxy:', error);
                setItems([]);
                setTotalPages(0);
            }
        };

        const interval = setInterval(fetchData, 250);
        return () => clearInterval(interval);
    }, [api, page]);

    const columns = [
        { name: "Proxy", uid: "Proxy" },
        { name: "Status", uid: "Status" },
        { name: "GT Status", uid: "GT Status" },
        { name: "Bots", uid: "Bots" },
        { name: "Actions", uid: "Actions" },
    ];

    const getStatusIcon = (status) => {
        if (status === "notWorking") {
            return <HiOutlineXMark style={{ fontSize: "1.2rem", color: "red" }} />;
        } else if (status === "processing" || status === "none" || status === "pending") {
            return <Spinner color="warning" size="sm" />
        } else {
            return <IoCheckmarkOutline style={{ fontSize: "1.2rem", color: "green" }} />;
        }
    };


    const renderCell = useCallback((proxyData, columnKey) => {
        const columnMap = {
            "Proxy": proxyData.proxy,
            "Status": getStatusIcon(proxyData.status),
            "GT Status": getStatusIcon(proxyData.status === "notWorking" ? proxyData.status : proxyData.gtStatus),
            "Bots": proxyData.bots,
            "Actions": (
                <>
                    <Tooltip content="Check Proxy">
                        <div>
                            <MdCheckCircleOutline onClick={() => api.proxyService.checkProxy(proxyData.proxy)} style={{ fontSize: "1.2rem" }} />
                        </div>
                    </Tooltip>
                    <Tooltip content="Remove Proxy">
                        <div>
                            <FaCircleXmark onClick={() => api.proxyService.removeProxy(proxyData.proxy)} style={{ fontSize: "1.2rem" }} />
                        </div>
                    </Tooltip>
                </>
            ),
        };


        const renderContent = (content) => (

            <div className="flex flex-col">
                {typeof content === 'string' || typeof content === 'number' ? (
                    <span className="text-bold text-sm capitalize">{content}</span>
                ) : (
                    <div className="flex flex-row space-x-2">

                        {content}
                    </div>
                )}
            </div>
        );

        return columnKey in columnMap ? renderContent(columnMap[columnKey]) : null;
    }, [api.botService, openModal]);

    return (
        <div className="flex flex-col w-full max-w-[1024px] mx-auto">

            <div className="flex justify-end ">
                <Button size="md" className="px-4 py-1 m-4" onPress={() => openModal('AddProxy')}>
                    Add Proxy
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
                        <TableRow key={item.proxy}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ProxyStatus;