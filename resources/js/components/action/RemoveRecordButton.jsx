import React, { useState } from "react";
import { Button, Popconfirm, Tooltip, notification } from "antd";
import { FaTrash } from "react-icons/fa";
import api from "@/api/api";

const RemoveRecordButton = ({ record, apiUrl, onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        try {
            setLoading(true);
            await api.delete(`${apiUrl}/${record.id}`);

            notification.success({
                message: 'Xóa thành công',
                description: 'Thao tác đã được thực hiện thành công.',
            });

            onSuccess?.(record.id);
        } catch (error) {
            notification.error({
                message: 'Xóa thất bại',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Tooltip title="Xóa">
            <Popconfirm
                title="Thông báo"
                description="Bạn có chắc chắn xóa không?"
                okText="Đồng ý"
                cancelText="Không"
                onConfirm={handleConfirm}
            >
                <Button danger>
                    <FaTrash className="w-4 h-4" />
                </Button>
            </Popconfirm>
        </Tooltip>
    );
};

export default RemoveRecordButton;
