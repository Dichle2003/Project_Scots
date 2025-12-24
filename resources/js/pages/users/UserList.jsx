import React, {useState} from "react";
import {useUsers} from "@/hooks/users/useUsers";
import {Table, Tooltip} from "antd";
import {Link} from "react-router-dom";
import useTableStyle from "@/components/styles/tableStyle";
import {FaEdit, FaEye} from "react-icons/fa";
import RemoveRecordButton from "@/components/action/RemoveRecordButton";
import {useQueryClient} from "@tanstack/react-query";
import Breadcrumb from "@/components/Breadcrumb";
import EditRecordButton from "@/components/action/EditRecordButton";

const UserList = () => {
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
            title: 'Họ và tên',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            columnKey: 'name',
            fixed: 'start',
            sorter: true,
        },
        {
            title: 'Email',
            width: 100,
            dataIndex: 'email',
            key: 'email',
            columnKey: 'email',
            fixed: 'start',
            sorter: true,
        },
        {
            title: 'Email cá nhân',
            width: 100,
            dataIndex: 'personal_email',
            key: 'personal_email',
            columnKey: 'personal_email',
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
                    <EditRecordButton record={record} apiUrl='users'/>
                    <RemoveRecordButton record={record} apiUrl='users' onSuccess={handleDeleteSuccess}/>
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

    const {data, isLoading} = useUsers(query);// Cần sửa theo MODULE

    const users = data?.data ?? [];
    const meta = data?.meta ?? {};

    const handleDeleteSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: ["users"],
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
                title="Quản lý nhân sự"
                items={[
                    {label: "Trang chủ", href: "/"},
                    {label: "Quản lý nhân sự"},
                ]}
            />
            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">
                    <div className="px-6 py-3 flex items-center justify-between"><h2
                        className="text-base font-medium text-gray-800 dark:text-white/90 !mb-0">Danh sách nhân sự</h2>
                        <Link
                            to="/users/create">
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
                                        dataSource={users}
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
export default UserList;
