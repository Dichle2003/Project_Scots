import React from "react";
import { Form, Input, Space, Button, notification } from 'antd';
import Breadcrumb from "@/components/Breadcrumb";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useAddCenter } from "../../hooks/centers/useCenters.js"; // Dùng đúng hook mutation
import { useNavigate } from "react-router-dom"; // Để điều hướng khi bấm Thoát

const CenterCreate = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const addCenterMutation = useAddCenter();

    const onFinish = (values) => {
        addCenterMutation.mutate(values, {
            onSuccess: () => {
                notification.success({
                    title: 'Thông báo',
                    description: 'Thao tác đã được thực hiện thành công.',
                });
            },
            onError: (err) => {
                notification.error({
                    title: 'Lỗi hệ thống',
                    description: err?.response?.data?.message || "Có lỗi xảy ra",
                });
            },
        });
    };

    return (
        <div>
            <Breadcrumb
                title="Thêm Trung Tâm Mới"
                items={[
                    { label: "Trang chủ", href: "/" },
                    { label: "Quản lý trung tâm", href: "/centers" },
                    { label: "Thêm mới trung tâm" },
                ]}
            />
            <div className="grid grid-cols-1 gap-6">
                <Form
                    form={form} // Gán form instance vào đây
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                                <h3 className="text-base font-medium text-gray-800 dark:text-white/90 !mb-0">Thông tin chung</h3>
                            </div>
                            <div className="p-4 sm:p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                    <Form.Item label="Mã trung tâm" name="code" rules={[{ required: true, message: "Vui lòng nhập mã" }]}>
                                        <Input size="large" placeholder="Nhập mã..." />
                                    </Form.Item>

                                    <Form.Item label="Mã trung tâm cũ" name="old_code">
                                        <Input size="large" placeholder="Nhập mã cũ..." />
                                    </Form.Item>

                                    <Form.Item label="Tên trung tâm" name="name" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
                                        <Input size="large" placeholder="Nhập tên trung tâm..." />
                                    </Form.Item>

                                    <Form.Item label="Mã vùng" name="region_code" rules={[{ required: true, message: "Vui lòng nhập mã vùng" }]}>
                                        <Input size="large" placeholder="Nhập mã vùng..." />
                                    </Form.Item>

                                    <Form.Item label="Tên vùng" name="region_name" rules={[{ required: true, message: "Vui lòng nhập tên vùng" }]}>
                                        <Input size="large" placeholder="Nhập tên vùng..." />
                                    </Form.Item>

                                    <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
                                        <Input size="large" placeholder="Nhập địa chỉ..." />
                                    </Form.Item>
                                </div>

                                <div className="flex justify-center mt-6 space-x-4 border-t pt-6">
                                    <Button
                                        size="large"
                                        type="primary"
                                        htmlType="submit"
                                        loading={addCenterMutation.isPending} // Thêm loading khi đang call API
                                        icon={<FaSave />}
                                    >
                                        Lưu dữ liệu
                                    </Button>
                                    <Button
                                        size="large"
                                        onClick={() => navigate("/centers")}
                                        icon={<FaArrowLeft />}
                                    >
                                        Quay lại
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default CenterCreate;
