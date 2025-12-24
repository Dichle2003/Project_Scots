import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Space, Button } from 'antd';
import Breadcrumb from "@/components/Breadcrumb";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getUserById, updateUser } from "@/api/user.api";

const UserUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [form] = Form.useForm();

    // 1. Lấy dữ liệu user
    const { data: userData, isLoading } = useQuery(
        ["user", id],
        () => getUserById(id),
        {
            onSuccess: (data) => {
                // Set dữ liệu vào form, chuyển string sang moment cho DatePicker
                form.setFieldsValue({
                    ...data,
                    birthday: data.birthday ? moment(data.birthday) : null,
                    date_of_issue: data.date_of_issue ? moment(data.date_of_issue) : null,
                });
            },
        }
    );

    // 2. Mutation cập nhật
    const updateMutation = useMutation(updateUser, {
        // onSuccess: () => {
        //     toast.success("Cập nhật thành công!");
        //     queryClient.invalidateQueries(["users"]);
        //     navigate("/users");
        // },
        // onError: () => {
        //     toast.error("Cập nhật thất bại!");
        // }
    });

    // 3. Submit form
    const onFinish = (values) => {
        const payload = {
            ...values,
            birthday: values.birthday?.format("YYYY-MM-DD"),
            date_of_issue: values.date_of_issue?.format("YYYY-MM-DD"),
        };
        updateMutation.mutate({ id, ...payload });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <Breadcrumb
                title="Cập nhật nhân sự"
                items={[
                    { label: "Trang chủ", href: "/" },
                    { label: "Quản lý nhân sự", href: "/users" },
                    { label: "Cập nhật nhân sự" },
                ]}
            />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    name="nest-messages"
                    onFinish={onFinish}
                >
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                            <div className="px-6 py-5">
                                <h3 className="text-base font-medium text-gray-800 dark:text-white/90 !mb-0">
                                    Thông tin chung
                                </h3>
                            </div>
                            <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                                    <Form.Item
                                        hasFeedback
                                        label="Họ & Tên"
                                        name="name"
                                        rules={[
                                            { required: true, message: "Vui lòng không để trống" },
                                            { max: 255, message: "Tối đa 255 ký tự" },
                                        ]}
                                    >
                                        <Input size="large" placeholder="..." />
                                    </Form.Item>
                                    <Form.Item
                                        hasFeedback
                                        label="Ngày sinh"
                                        name="birthday"
                                        rules={[{ required: true, message: "Vui lòng không để trống" }]}
                                    >
                                        <DatePicker size="large" className="w-full" />
                                    </Form.Item>
                                    <Form.Item
                                        hasFeedback
                                        label="Số điện thoại"
                                        name="phone"
                                        rules={[
                                            { required: true, message: "Vui lòng không để trống" },
                                            {
                                                pattern: /^(0[3|5|7|8|9])[0-9]{8}$/,
                                                message: "Số điện thoại không hợp lệ (10 số)",
                                            },
                                        ]}
                                    >
                                        <Input size="large" inputMode="numeric" placeholder="..." />
                                    </Form.Item>
                                    <Form.Item
                                        hasFeedback
                                        label="Email cá nhân"
                                        name="personal_email"
                                        rules={[
                                            { required: true, message: "Vui lòng không để trống" },
                                            { type: "email", message: "Email không đúng định dạng" },
                                        ]}
                                    >
                                        <Input size="large" placeholder="..." />
                                    </Form.Item>
                                </div>

                                <div className="border-t mx-2 mt-4"></div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-4">
                                    <Form.Item
                                        hasFeedback
                                        label="Căn cước công dân"
                                        name="so_cccd"
                                        rules={[
                                            { required: true, message: "Vui lòng không để trống" },
                                            {
                                                pattern: /^[0-9]{12}$/,
                                                message: "Căn cước công dân phải gồm đúng 12 số",
                                            },
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="..."
                                            maxLength={12}
                                            inputMode="numeric"
                                            onChange={(e) => {
                                                e.target.value = e.target.value.replace(/\D/g, "");
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        hasFeedback
                                        label="Ngày cấp"
                                        name="date_of_issue"
                                        rules={[{ required: true, message: "Vui lòng không để trống" }]}
                                    >
                                        <DatePicker size="large" className="w-full" />
                                    </Form.Item>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 gap-x-1 gap-y-1">
                                    <Form.Item
                                        hasFeedback
                                        label="Nơi cấp"
                                        name="noi_cap_cccd"
                                        rules={[
                                            { required: true, message: "Vui lòng không để trống" },
                                            { max: 255, message: "Tối đa 255 ký tự" },
                                        ]}
                                    >
                                        <Input size="large" placeholder="..." />
                                    </Form.Item>
                                </div>

                                <div className="border-t mx-2"></div>
                                <div className="flex justify-center mt-4 space-x-4">
                                    <Form.Item>
                                        <Space>
                                            <Button
                                                size="large"
                                                type="primary"
                                                htmlType="submit"
                                                loading={updateMutation?.isLoading}
                                            >
                                                <FaSave /> Lưu
                                            </Button>
                                            <Button size="large" htmlType="button" onClick={() => navigate("/users")}>
                                                <FaArrowLeft /> Thoát
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UserUpdate;
