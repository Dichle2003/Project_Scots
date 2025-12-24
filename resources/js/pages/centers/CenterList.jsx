import React, {useState} from "react";
import {useCenters} from "@/hooks/centers/useCenters";
import {Table, Tooltip} from "antd";
import {Link} from "react-router-dom";
import useTableStyle from "@/components/styles/tableStyle";
import {FaEdit, FaEye} from "react-icons/fa";
import RemoveRecordButton from "@/components/action/RemoveRecordButton";
import {useQueryClient} from "@tanstack/react-query";
import Breadcrumb from "@/components/Breadcrumb";
import EditRecordButton from "@/components/action/EditRecordButton";

const CenterList = () => {
    const {styles} = useTableStyle();
    const queryClient = useQueryClient();
    const columns = [
        {
            title: 'STT',
            key: 'index',
            width: 60,
            render: (text, record, index) => (query.page - 1) * query.limit + index + 1,
        },
        {
            title: 'Mã Trung Tâm',
            width: 100,
            dataIndex: 'code',
            key: 'code',
            columnKey: 'code',
            fixed: 'start',
            sorter: true,
        },
        {
            title: 'Tên Trung Tâm',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            columnKey: 'name',
            fixed: 'start',
            sorter: true,
        },
        {
            title: 'Tên Vùng',
            width: 100,
            dataIndex: 'region_name',
            key: 'region_name',
            columnKey: 'region_name',
            fixed: 'start',
            sorter: true,
        },
        {
            title: 'Địa Chỉ',
            width: 100,
            dataIndex: 'address',
            key: 'address',
            columnKey: 'address',
            fixed: 'start',
            sorter: true,
        },
        {
            title: 'Hành động ',
            key: 'operation',
            fixed: 'end',
            width: 200,
            render: (_, record) => (
                <div className="flex gap-2">
                    <Tooltip title="Xem chi tiết">
                        <button
                            className="px-3 py-1 bg-blue-600 !text-white rounded hover:bg-blue-700 transition"
                            onClick={() => handleShow(record)}
                        >
                            <FaEye/>
                        </button>
                    </Tooltip>
                    <EditRecordButton record={record} apiUrl='centers'/>
                    <RemoveRecordButton record={record} apiUrl='centers' onSuccess={handleDeleteSuccess}/>
                </div>
            ),
        },
    ];
    const [query, setQuery] = useState({
        page: 1,
        limit: 20,
        search: "",
        sortField: null,
        sortOrder: null,
    });

    const {data, isLoading} = useCenters(query);// Cần sửa theo MODULE

    const centers = data?.data ?? [];
    const meta = data?.meta ?? {};

    const handleDeleteSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: ["centers"],
        });
    };
    const handleTableChange = (pagination, filters, sorter) => {
        setQuery((prev) => ({
            ...prev,
            page: pagination.current,
            limit: pagination.pageSize,
            sortField: sorter.columnKey ?? null,
            sortOrder:
                sorter.order === "ascend"
                    ? "asc"
                    : sorter.order === "descend"
                        ? "desc"
                        : null,
        }));
    };

    return (
        <div>
            <Breadcrumb
                title="Quản lý trung tâm"
                items={[
                    {label: "Trang chủ", href: "/"},
                    {label: "Quản lý nhân sự"},
                ]}
            />
            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">
                    <div className="px-6 py-3 flex items-center justify-between"><h2
                        className="text-base font-medium text-gray-800 dark:text-white/90 !mb-0">Danh sách trung tâm</h2>
                        <Link
                            to="/centers/createcenter">
                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-normal
                           !text-white bg-blue-600 rounded-lg
                           hover:bg-blue-700
                                transition-colors duration-200"
                            >
                                + Thêm mới
                            </button>
                        </Link>
                    </div>
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-0">
                        <div className="space-y-6">
                            <div
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                                <div className="max-w-full overflow-x-auto">
                                    <Table
                                        rowKey="id"
                                        className={styles.customTable}
                                        columns={columns}
                                        dataSource={centers}
                                        pagination={{
                                            current: query.page,
                                            pageSize: query.limit,
                                            total: meta.total,
                                            showSizeChanger: true,
                                            pageSizeOptions: [10, 20, 50],
                                        }}
                                        onChange={handleTableChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default CenterList;
