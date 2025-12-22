import React, { useState } from "react";
import { useUsers } from "@/hooks/users/useUsers";
import {Table} from "antd";
import useTableStyle from "@/components/styles/tableStyle";

const columns = [
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
        title: 'Action',
        key: 'operation',
        fixed: 'end',
        width: 100,
        render: () => <a>action</a>,
    },
];
const UserList = () => {
    const {styles} = useTableStyle();
    const [query, setQuery] = useState({
        page: 1,
        limit: 10,
        search: "",
        sortField: null,
        sortOrder: null,
    });
    const { data, isLoading } = useUsers(query);
    const users = data?.data ?? [];
    const meta  = data?.meta ?? {};
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

    if (isLoading) return <p>Loading...</p>;
    return (
        <div>
            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">
                    <div className="px-6 py-3"><h2
                        className="text-base font-medium text-gray-800 dark:text-white/90 !mb-0">Danh sách nhân sự</h2></div>
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                        <div className="space-y-6">
                            <div
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                                <div className="max-w-full overflow-x-auto">
                                    <Table
                                        rowKey="id"
                                        className={styles.customTable}
                                        columns={columns}
                                        dataSource={users}
                                        loading={isLoading}
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
