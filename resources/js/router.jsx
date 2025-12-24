import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/auths/Login";
import UserList from "@/pages/users/UserList";
import UserCreate from "@/pages/users/UserCreate";
import UserUpdate from "@/pages/users/UserUpdate";
import CenterList from "./pages/centers/CenterList.jsx";
import CenterCreate from "./pages/centers/CenterCreate.jsx";


/* check auth tạm thời bằng localStorage */
const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
};

/* Route bảo vệ */
const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        handle: {
            title: "Đăng nhập",
        },
    },
    {
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <Home />,
                handle: {
                    title: "Trang chủ",
                },
            },
            {
                path: "/users",
                element: <UserList />,
                handle: {
                    title: "Trang chủ",
                },
            },
            {
                path: "/users/create",
                element: <UserCreate />,
                handle: {
                    title: "Thêm mới nhân sự",
                },
            },
            {
                path: "/users/:id/edit",
                element: <UserUpdate />,
                handle: {
                    title: "Cập nhật nhân sự",
                },
            },
            {
                path: "/centers",
                element: <CenterList />,
                handle: {
                    title: "Danh sách trung tâm",
                },
            },
            {
                path: "/centers/createcenter",
                element: <CenterCreate />,
                handle: {
                    title: "Thêm trung tâm",
                },
            }
        ],

    },
    {
        path: "*",
        element: <Navigate to="/login" replace />,
    },
]);

export default router;
